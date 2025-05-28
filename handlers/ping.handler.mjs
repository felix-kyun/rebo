export const pingHandler = async (message) => {
  const { args } = message;

  message.reply(`Pong ${args.join(" ") || ""}!`);
  message.react("✅");

  return true;
};
