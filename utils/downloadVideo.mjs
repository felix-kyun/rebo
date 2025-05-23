import { fileExists } from "./fileExists.mjs";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

const execPromise = promisify(exec);

export const downloadVideo = async (url) => {
  const fileName = uuidv4();
  const output = `./.downloadCache/output/${fileName}.mp4`;

  // if file is already downloaded, return
  if (await fileExists(output)) {
    return output;
  }

  try {
    // download the video using yt-dlp
    try {
      await execPromise(
        `/usr/bin/yt-dlp -S filesize --merge-output-format mp4 -f 'bv[height=720]+ba/b[height=720]/bv[height=480]+ba/b[height=480]/bv[height=1080]+ba/b[height=1080]/bv[height=1024]+ba/b[height=1024]' -o './.downloadCache/${fileName}.%(ext)s' ${url}`,
      );
    } catch (err) {
      await execPromise(
        `/usr/bin/yt-dlp -S filesize --merge-output-format mp4  -o './.downloadCache/${fileName}.%(ext)s' ${url}`,
      );
    }

    // fix the codec as required by whatsapp
    await execPromise(
      `ffmpeg -i ./.downloadCache/${fileName}.mp4 -c:v libx264 -map 0 -movflags +faststart ./.downloadCache/output/${fileName}.mp4`,
    );
  } catch (err) {
    throw new Error("Failed to download video" + err.message);
  }

  return output;
};
