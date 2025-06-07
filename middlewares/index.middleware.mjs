import { autoDownload } from "./autoDownload.middleware.mjs";
import { debugLogger } from "./debugLogger.middleware.mjs";
import { ignoreOwnMessage } from "./ignoreOwnMessage.middleware.mjs";
import { quickReaction } from "./quickReaction.middleware.mjs";
import { splitCommand } from "./splitCommand.middleware.mjs";
import { userMiddleware } from "./user.middleware.mjs";

export const middlewares = [
    // skips bot's own messages
    ignoreOwnMessage,

    // parses the userid and creates a new user if it doesn't exist
    userMiddleware,

    // adds quick reaction methods to the message object
    quickReaction,

    // splits the command and arguments
    splitCommand,

    // auto download media
    autoDownload,

    // debugging
    debugLogger,
];
