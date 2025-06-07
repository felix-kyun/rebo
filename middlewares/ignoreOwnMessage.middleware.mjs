import { BOT_MESSAGES, replyMutex } from "../utils/config/config.mjs";
import { logger } from "../utils/log/log.mjs";

export async function ignoreOwnMessage(message) {
    // skip bot's own messages
    await replyMutex.lock();

    try {
        if (BOT_MESSAGES.has(message.id._serialized)) {
            logger.debug("Ignoring own message");
            return false;
        }
    } finally {
        replyMutex.unlock();
    }
}
