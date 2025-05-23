import wa from "whatsapp-web.js";
import { downloadVideo } from "../utils/downloadVideo.mjs";
import { client } from "../client.mjs";
import { handleSafely } from "../utils/handleSafely.mjs";

const { MessageMedia } = wa;

export const videoDownloadHanlder = async (message) => {
  const { body, from } = message;
  if (!body.startsWith("/downloadVideo")) return false;

  await client.sendPresenceAvailable();

  const videoUrl = body.split(" ")[1];
  if (!videoUrl) {
    message.reply("Please provide a video URL.");
    return true;
  }

  message.reply("Downloading video...");
  let videoPath = handleSafely(message, async () => downloadVideo(videoUrl));
  const media = MessageMedia.fromFilePath(videoPath);

  await handleSafely(message, async () => message.reply(media));

  await client.sendPresenceUnavailable();
  return true;
};
