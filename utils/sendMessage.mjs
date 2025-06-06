import { client } from "../client.mjs";
import { BOT_MESSAGES, BOT_STATE } from "./config/config.mjs";

export async function sendMessage(id, message, opts) {
    BOT_STATE.isCurrentReplying = true;

    const sentMessage = await client.sendMessage(id, message, opts);
    BOT_MESSAGES.add(sentMessage.id._serialized);

    BOT_STATE.isCurrentReplying = false;

    return sentMessage;
}
