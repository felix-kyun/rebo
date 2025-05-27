export const transform = (message) => {
  // Split the message into command and arguments
  const parts = message.body.split(" ");
  const command = parts[0].substring(1);
  const args = parts.slice(1);

  // return { command, args, ...message };
  message.command = command;
  message.args = args;
  return message;
};
