import { info } from "./info.command.mjs";
import { pingHandler as ping } from "./ping.command.mjs";
import { download } from "./media.command.mjs";
import { help } from "./help.command.mjs";
import { echo } from "./echo.command.mjs";
import { setHandler } from "./set.command.mjs";
import { getHandler } from "./get.command.mjs";
import { ai } from "./ai.command.mjs";

export const commands = {
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
