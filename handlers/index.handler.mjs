import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { videoDownloadHanlder } from "./media.handler.mjs";
import { pingHandler } from "./ping.handler.mjs";

const handlers = {
  message_create: [pingHandler, videoDownloadHanlder],
};

registerHandlers(client, handlers);
