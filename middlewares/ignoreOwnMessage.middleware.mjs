import { BOT_MESSAGES, BOT_STATE } from "../utils/config/config.mjs";
import { logger } from "../utils/log/log.mjs";
import { waitFor } from "../utils/waitFor.mjs";

export async function ignoreOwnMessage(message) {
    // skip bot's own messages
    if (BOT_STATE.isCurrentReplying) {
        await waitFor(() => !BOT_STATE.isCurrentReplying);
    }
    if (BOT_MESSAGES.has(message.id._serialized)) {
        logger.debug("Ignoring own message");
        return false;
    }
}
