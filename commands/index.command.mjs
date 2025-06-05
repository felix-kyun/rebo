import { info } from "./info.command.mjs";
import { pingHandler as ping } from "./ping.command.mjs";
import { download } from "./media.command.mjs";
import { help } from "./help.command.mjs";
import { echo } from "./echo.command.mjs";
import { setHandler } from "./set.command.mjs";
import { getHandler } from "./get.command.mjs";
import { ai } from "./ai.command.mjs";
import { user } from "./user.command.mjs";
import { ENV } from "../utils/config/config.mjs";
import { test } from "./test.command.mjs";

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
        user,
    },
};

if (ENV === "development" || ENV === "test") {
    // Add test commands only in development or test environments
    commands.message_create.test = test;
}
