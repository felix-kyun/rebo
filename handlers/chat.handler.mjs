import { Chat } from "../models/chat.model.mjs";

export async function chatHandler(message) {
  const { body } = message;

  // check
  if (!body.startsWith("/chat")) return false;

  const [command, preference, value, ..._] = body.split(" ");

  // load the chat preferences
  const chat = await message.getChat();
  const chatPref = await Chat.findOne({
    chatId: chat.id._serialized,
  });

  if (!chatPref) {
    message.reply("Chat not initialized. Use /init to set up.");
    return true;
  }

  // tmp
  message.reply(`Chat preferences: ${chatPref.preferences.toString()}`);
}
