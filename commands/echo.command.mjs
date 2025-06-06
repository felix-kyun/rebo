import { BOT_MESSAGES } from "../utils/config/config.mjs";
import { sendMessage } from "../utils/sendMessage.mjs";

export const echo = async (message) => {
    const { args } = message;

    // const reply = await message.reply(`${args.join(" ") || ":v"}!`);
    const reply = await sendMessage(
        message.user.id,
        `${args.join(" ") || ":v"}!`,
        {
            quotedMessageId: message.id._serialized,
        },
    );
    BOT_MESSAGES.add(reply.id._serialized);

    return true;
};
