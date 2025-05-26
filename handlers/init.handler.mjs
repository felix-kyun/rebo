import { Chat } from "../models/chat.model.mjs";

export async function initHandler(message) {
  const { body, from } = message;
  const [command, preference, value, ..._] = body.split(" ");

  if (command === "/init") {
    const chat = await message.getChat();
    const chatPreferences = Chat({
      chatId: chat.id._serialized,
      chatName: chat.name,
      chatType: chat.iGroup ? "group" : "individual",
    });

    await chatPreferences.save();
    message.reply("chat initialized");
  }
}
