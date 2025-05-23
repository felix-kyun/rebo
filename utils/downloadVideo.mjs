import YTDlpWrap from "yt-dlp-wrap";
import { fileExists } from "./fileExists.mjs";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export const downloadVideo = async (url) => {
  const fileName = url.split("/").pop();
  const output = `./.downloadCache/output/${fileName}.mp4`;

  // if file is already downloaded, return
  if (await fileExists(output)) {
    return output;
  }

  try {
    // download the video using yt-dlp
    await execPromise(
      `/usr/bin/yt-dlp -S filesize --merge-output-format mp4 -f 'bv[height=720]+ba/b[height=720]' -o './.downloadCache/${fileName}.%(ext)s' ${url}`,
    );

    // fix the codec as required by whatsapp
    await execPromise(
      `ffmpeg -i ./.downloadCache/${fileName}.mp4 -c:v libx264 -map 0 -movflags +faststart ./.downloadCache/output/${fileName}.mp4`,
    );
  } catch (err) {
    throw new Error("Failed to download video" + err.message);
  }

  return output;
};
