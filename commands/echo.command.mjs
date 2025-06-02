export const echo = async (message) => {
    const { args } = message;

    message.reply(`${args.join(" ") || ":v"}!`);

    return true;
};
