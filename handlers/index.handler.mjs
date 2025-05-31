import { info } from "./info.handler.mjs";
import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { pingHandler as ping } from "./ping.handler.mjs";
import { download } from "./media.handler.mjs";
import { help } from "./help.handler.mjs";
import { echo } from "./echo.handler.mjs";
import { setHandler } from "./set.handler.mjs";
import { getHandler } from "./get.handler.mjs";
import { ai } from "./ai.handler.mjs";

const handlers = {
	message_create: {
		ping,
		info,
		download,
		help,
		echo,
		set: setHandler,
		get: getHandler,
		ai,
	},
};

registerHandlers(client, handlers);
