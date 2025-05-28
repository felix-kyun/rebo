import { info } from "./info.handler.mjs";
import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { pingHandler as ping } from "./ping.handler.mjs";
import { download } from "./media.handler.mjs";

const handlers = {
  message_create: {
    ping,
    info,
    download,
  },
};

registerHandlers(client, handlers);
