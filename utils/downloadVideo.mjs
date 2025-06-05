import { fileExists } from "./fileExists.mjs";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { InvokeDlp } from "invoke-dlp";
import { downloadCache } from "./cache.mjs";
import wa from "whatsapp-web.js";
import { logger } from "./log/log.mjs";
import { getFileSizeInMb } from "./getFileSizeInMb.mjs";
const { MessageMedia } = wa;

const execPromise = promisify(exec);

export const downloadVideo = async (url) => {
    const fileName = uuidv4();
    const output = `./.downloadCache/output/${fileName}.mp4`;

    // if file is already downloaded, return
    // nvm this won't work because the file name is random to begin with
    // maybe we can keep a list of downloaded files in db mapped to their urls
    if (await fileExists(output)) {
        return output;
    }

    try {
        // download the video using yt-dlp
        const ytDlp = new InvokeDlp("/usr/bin/yt-dlp");
        await ytDlp
            .sort("filesize")
            .outputFormat("mp4")
            .format(
                "bv[height=720]+ba/b[height=720]/bv[height=480]+ba/b[height=480]/bv+ba/b",
            )
            .output(`./.downloadCache/${fileName}.mp4`)
            .exec(url);

        // fix the codec as required by whatsapp
        await execPromise(
            `ffmpeg -i ./.downloadCache/${fileName}.mp4 -c:v libx264 -map 0 -movflags +faststart ./.downloadCache/output/${fileName}.mp4`,
        );
    } catch (err) {
        throw new Error("Failed to download video" + err.message);
    }

    return output;
};

export async function downloadSingleVideo(message, url) {
    // cache hit
    const cachedFile = await downloadCache.get(url);
    if (cachedFile) {
        const media = MessageMedia.fromFilePath(cachedFile);
        message.reply(media);
        return true;
    }

    // cache miss
    const videoPath = await downloadVideo(url);
    const fileSize = await getFileSizeInMb(videoPath);

    if (fileSize > 50) {
        throw new Error(
            "File size exceeds 50MB limit imposed by whatsapp-web.js",
        );
    }

    // save to cache
    downloadCache.add(url, videoPath);
    logger.info(`[cache set]: ${url} -> ${videoPath.split("/").pop()}`);

    const media = MessageMedia.fromFilePath(videoPath);
    await message.reply(media);
}

export async function downloadVideoFromUrls(message, urls) {
    // download all the urls
    const downloadPromises = urls.map(
        async (url) => await downloadSingleVideo(message, url),
    );

    const downloadStatus = await Promise.allSettled(downloadPromises);

    // check if all downloads were successful
    if (downloadStatus.every((status) => status.status === "fulfilled")) {
        return true;
    } else {
        // if any download failed, log the error
        downloadStatus.forEach(async ({ status, reason }, index) => {
            if (status === "rejected") {
                const errorMessage = `Failed to download video from URL: ${urls[index]}\nError: ${reason}`;

                logger.error(errorMessage);
                await message.error();
            }
        });
    }

    return false;
}
