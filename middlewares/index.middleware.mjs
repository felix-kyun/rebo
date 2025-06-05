import { autoDownload } from "./autoDownload.middleware.mjs";
import { quickReaction } from "./quickReaction.middleware.mjs";
import { splitCommand } from "./splitCommand.middleware.mjs";
import { userMiddleware } from "./user.middleware.mjs";

export const middlewares = [
    // parses the userid and creates a new user if it doesn't exist
    userMiddleware,

    // adds quick reaction methods to the message object
    quickReaction,

    // splits the command and arguments
    splitCommand,

    // auto download media
    autoDownload,
];
