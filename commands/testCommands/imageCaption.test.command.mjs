import wa from "whatsapp-web.js";
import { sendMessage } from "../../utils/sendMessage.mjs";
import { logger } from "../../utils/log/log.mjs";

const { MessageMedia } = wa;

export async function caption(message) {
    logger.debug("Executing caption command");
    const { args } = message;

    if (args[0]) {
        const media = await MessageMedia.fromUrl(args[0], {
            unsafeMime: true,
        });
        await sendMessage(message.user.id, media, {
            caption: "This is a caption for the image.",
            media: {
                mimetype: "image/png",
                filename: "image.png",
            },
        });
        return true;
    }

    return false;
}
