import { client } from "../client.mjs";
import { BOT_MESSAGES } from "./config/config.mjs";

export async function sendMessage(id, message, opts) {
    const sentMessage = await client.sendMessage(id, message, opts);
    BOT_MESSAGES.add(sentMessage.id._serialized);
    return sentMessage;
}
