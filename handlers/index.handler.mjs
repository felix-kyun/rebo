import { info } from "./info.handler.mjs";
import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { pingHandler as ping } from "./ping.handler.mjs";
import { download } from "./media.handler.mjs";
import { help } from "./help.handler.mjs";
import { echo } from "./echo.handler.mjs";

const handlers = {
  message_create: {
    ping,
    info,
    download,
    help,
    echo,
  },
};

registerHandlers(client, handlers);
