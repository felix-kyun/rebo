export const pingHandler = (message) => {
  const { body } = message;
  if (body !== "/ping") return false;

  message.reply("pong");
  return true;
};
