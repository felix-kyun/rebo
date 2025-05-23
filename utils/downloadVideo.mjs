import YTDlpWrap from "yt-dlp-wrap";
import { fileExists } from "./fileExists.mjs";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
const ytdlp = new YTDlpWrap.default("/usr/bin/yt-dlp");

export const downloadVideo = async (url) => {
  const fileName = url.split("/").pop();
  const output = `./.downloadCache/output/${fileName}.mp4`;

  // if file is already downloaded, return
  if (await fileExists(output)) {
    return output;
  }

  try {
    // download the video using yt-dlp
    await ytdlp.execPromise([
      url,
      "-S res,ext:mp4",
      "-o",
      `./.downloadCache/${fileName}.%(ext)s`,
    ]);

    // fix the codec as required by whatsapp
    const { stdout, stderr } = await execPromise(
      `ffmpeg -i ./.downloadCache/${fileName}.mp4 -c:v libx264 -map 0 -movflags +faststart ./.downloadCache/output/${fileName}.mp4`,
    );
  } catch (err) {
    console.error("Error downloading video:", err);
    return null;
  }

  return output;
};
