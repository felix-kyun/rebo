import { PREFIX } from "../utils/config/config.mjs";

export const splitCommand = (message) => {
    if (!message.body.startsWith(PREFIX)) return;

    // Split the message into command and arguments
    const parts = message.body.split(" ");
    const command = parts[0].replace(PREFIX, "");
    const args = parts.slice(1);

    message.command = command;
    message.args = args;

    return;
};
