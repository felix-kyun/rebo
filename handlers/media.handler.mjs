import wa from "whatsapp-web.js";
import { downloadVideo } from "../utils/downloadVideo.mjs";
import { client } from "../client.mjs";
import { getFileSizeInMb } from "../utils/getFileSizeInMb.mjs";

const { MessageMedia } = wa;

export const download = async (message) => {
  const { body } = message;
  let url, replyMsg;

  if (message.hasQuotedMsg) {
    const quotedMsg = await message.getQuotedMessage();
    url = quotedMsg.body;
    replyMsg = quotedMsg;
  } else {
    url = body.split(" ")[1];
    replyMsg = message;
  }

  if (!url) {
    message.reply("Please provide a video URL.");
    return false;
  }

  // await message.reply("```\nDownloading video...\n```");
  let videoPath = await downloadVideo(url);
  const fileSize = await getFileSizeInMb(videoPath);

  if (fileSize > 50) {
    throw new Error("File size exceeds 50MB limit imposed by whatsapp-web.js");
  }

  const media = MessageMedia.fromFilePath(videoPath);
  replyMsg.reply(media);

  return true;
};
