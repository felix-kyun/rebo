import { PREFIX } from "./config.mjs";
import { transform } from "./splitCommand.mjs";

/*
 * Registers event handler for a client
 * @param {Client} client - The client to register the handler for
 * @param {Array<function (message: Message): Promise<Boolean>>} handlers - List of handlers to register
 * @returns {void}
 */

export const registerHandlers = (client, handlers) => {
  for (const [event, handlerMap] of Object.entries(handlers)) {
    client.on(event, async (message) => {
      // check if the message is a command
      if (!message.body.startsWith(PREFIX)) return;

      message = transform(message);

      if (handlerMap[message.command]) {
        try {
          client.sendPresenceAvailable();
          await handlerMap[message.command](message);
        } catch (error) {
          console.error(
            `Error in ${handlerMap[message.command].name}: `,
            error.message,
          );
          message.reply(
            "*Oops! Something went wrong*\n```" + error.message + "```",
          );
        } finally {
          client.sendPresenceUnavailable();
        }
      }
    });
  }
};
