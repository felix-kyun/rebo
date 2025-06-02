import { Chat } from "../models/chat.model.mjs";

export async function getHandler(message) {
    const [key] = message.args;
    if (!key) throw new Error("Key must be provided");

    const user = await Chat.findOne({ chatId: message.from });
    if (!user) throw new Error("User not found");

    message.reply(`*${key}: ${user.preferences[key] || "undefined"}*`);
    return true;
}
