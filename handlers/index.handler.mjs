import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { chatHandler as chat } from "./chat.handler.mjs";
import { initHandler as init } from "./init.handler.mjs";
import { videoDownloadHanlder as downloadVideo } from "./media.handler.mjs";
import { pingHandler as ping } from "./ping.handler.mjs";

// const handlers = {
//   message_create: [pingHandler, videoDownloadHanlder, initHandler, chatHandler],
// };

const handlers = {
  message_create: {
    ping,
    // downloadVideo,
    // init,
    // chat,
  },
};

registerHandlers(client, handlers);
