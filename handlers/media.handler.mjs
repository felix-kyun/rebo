import wa from "whatsapp-web.js";
import { downloadVideo } from "../utils/downloadVideo.mjs";
import { client } from "../client.mjs";
import { stat } from "fs";
import { getFileSizeInMb } from "../utils/getFileSizeInMb.mjs";

const { MessageMedia } = wa;

export const videoDownloadHanlder = async (message) => {
  const { body, from } = message;
  if (!body.startsWith("/downloadVideo")) return false;

  await client.sendPresenceAvailable();

  let url;

  if (message.hasQuotedMsg) {
    const quotedMsg = await message.getQuotedMessage();
    url = quotedMsg.body;
  } else {
    url = body.split(" ")[1];
  }

  if (!url) {
    message.reply("Please provide a video URL.");
    return true;
  }

  message.reply("Downloading video...");
  let videoPath = await downloadVideo(url);
  const fileSize = await getFileSizeInMb(videoPath);

  if (fileSize > 50)
    throw new Error("File size exceeds 50MB limit imposed by whatsapp-web.js");

  const media = MessageMedia.fromFilePath(videoPath);
  message.reply(media);

  await client.sendPresenceUnavailable();
  return true;
};
