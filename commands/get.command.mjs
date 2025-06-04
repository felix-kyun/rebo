import { Chat } from "../models/chat.model.mjs";

export async function getHandler(message) {
    const { user } = message;
    const [key] = message.args;

    if (!key) throw new Error("Key must be provided");

    if (!(key in user.preferences)) {
        throw new Error(`Preference key "${key}" does not exist`);
    } else message.reply(`*${key}:* _${user.preferences[key]}_`);

    return true;
}
