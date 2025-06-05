import { downloadVideoFromUrls } from "../utils/downloadVideo.mjs";
import { extractUrl } from "../utils/extractUrl.mjs";
import { logger } from "../utils/log/log.mjs";

export async function autoDownload(message) {
    const { user, body } = message;
    if (user.pref?.autoDownload !== "true") return true;

    const urls = extractUrl(body);
    if (urls.length === 0) return true;

    logger.debug(`Auto-downloading files for user ${user.chatId}`);

    await message.wait();
    try {
        await downloadVideoFromUrls(message, urls);
        await message.success();
        return true;
    } catch (error) {
        await message.error();
        logger.warn(
            `Failed to auto-download files for user ${user.chatId}: ${error.message}`,
        );
    }
}
