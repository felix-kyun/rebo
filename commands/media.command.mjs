import { downloadVideoFromUrls } from "../utils/downloadVideo.mjs";
import { extractUrl } from "../utils/extractUrl.mjs";

export const download = async (message) => {
    const { body } = message;
    let urls, replyMsg;

    if (message.hasQuotedMsg) {
        const quotedMsg = await message.getQuotedMessage();
        urls = extractUrl(quotedMsg.body);
        replyMsg = quotedMsg;
    } else {
        urls = extractUrl(body);
        replyMsg = message;
    }

    if (urls.length === 0) {
        message.reply("Please provide a video URL.");
        return false;
    }

    return await downloadVideoFromUrls(replyMsg, urls);
};
