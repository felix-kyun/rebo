import { fileExists } from "./fileExists.mjs";
import { exec } from "child_process";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";
import { InvokeDlp } from "invoke-dlp";

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
