export const pingHandler = (message) => {
  const { body } = message;

  if (body === "/ping") message.reply("pong");
};
