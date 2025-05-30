import { Chat } from "../models/chat.model.mjs";

export async function getUserPreference(message, key) {
	const user = await Chat.findOne({ chatId: message.from });
	if (!user) throw new Error("User not found");

	return user.preferences[key] || undefined;
}
