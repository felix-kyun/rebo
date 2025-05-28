import wa from "whatsapp-web.js";
import { downloadVideo } from "../utils/downloadVideo.mjs";
import { client } from "../client.mjs";
import { getFileSizeInMb } from "../utils/getFileSizeInMb.mjs";
import { Url } from "../models/urlStore.models.mjs";

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

  // check cache
  const cachedUrl = await Url.findOne({ url });
  if (cachedUrl) {
    console.log("Using cached video for URL:", url);
    const media = MessageMedia.fromFilePath(cachedUrl.filename);
    replyMsg.reply(media);
    return true;
  }

  console.log("Downloading video from URL:", url);

  let videoPath = await downloadVideo(url);
  const fileSize = await getFileSizeInMb(videoPath);

  if (fileSize > 50) {
    throw new Error("File size exceeds 50MB limit imposed by whatsapp-web.js");
  }

  // save to cache
  await Url.create({
    url,
    filename: videoPath,
  });

  const media = MessageMedia.fromFilePath(videoPath);
  await replyMsg.reply(media);

  return true;
};
