import { client } from "../client.mjs";
import { BOT_MESSAGES, BOT_STATE, replyMutex } from "./config/config.mjs";

export async function sendMessage(id, message, opts) {
    await replyMutex.lock();

    const sentMessage = await client.sendMessage(id, message, opts);
    BOT_MESSAGES.add(sentMessage.id._serialized);

    replyMutex.unlock();

    return sentMessage;
}
