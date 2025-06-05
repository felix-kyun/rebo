import { User } from "../models/user.model.mjs";

export async function getUserPreference(message, key) {
    const user = await User.findOne({ chatId: message.from });
    if (!user) throw new Error("User not found");

    return user.preferences[key] || undefined;
}
