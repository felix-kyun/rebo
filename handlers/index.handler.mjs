import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { chatHandler } from "./chat.handler.mjs";
import { initHandler } from "./init.handler.mjs";
import { videoDownloadHanlder } from "./media.handler.mjs";
import { pingHandler } from "./ping.handler.mjs";

const handlers = {
  message_create: [pingHandler, videoDownloadHanlder, initHandler, chatHandler],
};

registerHandlers(client, handlers);
