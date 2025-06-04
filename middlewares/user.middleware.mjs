import { Chat } from "../models/chat.model.mjs";
import { PREFIX } from "../utils/config/config.mjs";
import { logger } from "../utils/log/log.mjs";

export const userMiddleware = async (message) => {
    if (!message.body.startsWith(PREFIX)) return;

    const { from } = message;
    const user = await Chat.findOne({ chatId: from });

    logger.debug(
        user ? user._doc : "No user found, creating new user",
        "new message from",
    );

    if (!user) {
        const chat = await message.getChat();
        const newChat = await Chat.create({
            chatId: chat.id._serialized,
            chatName: chat.name,
            chatType: chat.iGroup ? "group" : "individual",
        });

        message.user = newChat;
    } else {
        message.user = user;
    }

    return true;
};
