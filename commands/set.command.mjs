import { Chat } from "../models/chat.model.mjs";

export async function setHandler(message) {
    const [key, value] = message.args;
    if (!key || !value) throw new Error("Key and value must be provided");

    const user = await Chat.findOne({ chatId: message.from });
    if (!user) throw new Error("User not found");

    user.preferences = { ...user.preferences, [key]: value };
    await user.save();

    return true;
}
