import { Chat } from "../models/chat.model.mjs";

export async function setHandler(message) {
    const [key, value] = message.args;
    const { from, user } = message;
    if (!key || !value) throw new Error("Key and value must be provided");

    user.preferences = { ...user.preferences, [key]: value };
    await user.save();

    return true;
}
