/*
 * Registers event handler for a client
 * @param {Client} client - The client to register the handler for
 * @param {Array<function (message: Message): Promise<Boolean>>} handlers - List of handlers to register
 * @returns {void}
 */
export const registerHandlers = (client, handlers) => {
  for (const [event, handlerArray] of Object.entries(handlers)) {
    for (const handler of handlerArray) {
      client.on(event, async (message) => {
        try {
          await handler(message);
        } catch (error) {
          console.error(`Error in ${handler.name}: `, error.message);
          message.reply(
            "*Oops! Something went wrong*\n```" + error.message + "```",
          );
          client.sendPresenceUnavailable();
        }
      });

      console.log(`${handler.name} registered for event ${event}`);
    }
  }
};
