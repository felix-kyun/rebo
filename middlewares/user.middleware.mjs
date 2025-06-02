import { Chat } from "../models/chat.model.mjs";
import { logger } from "../utils/log/log.mjs";

export const userMiddleware = async (message) => {
    if (!message.body.startsWith("/")) return;

    const { from } = message;

    const user = Chat.findOne({ userId: from });
    if (!user) {
        const chat = await message.getChat();
        const newChat = await Chat.create({
            chatId: chat.id._serialized,
            chatName: chat.name,
            chatType: chat.iGroup ? "group" : "individual",
        });

        logger.info(
            `New chat created: ${newChat.chatId} - ${newChat.chatName}`,
        );

        message.user = newChat;
    } else message.user = user;

    return true;
};
