/*
 * Registers event handler for a client
 * @param {Client} client - The client to register the handler for
 * @param {Array<async function (message: Message): Boolean>} handlers - List of handlers to register
 * @returns {void}
 */
export const registerHandlers = (client, handlers) => {
  for (const [event, handlerArray] of Object.entries(handlers)) {
    for (const handler of handlerArray) {
      client.on(event, async (message) => {
        try {
          await handler(message);
        } catch (error) {
          console.error(`Error in handler for event ${event}:`, error);
          message.reply(
            "An error occurred while processing your request. Please try again.\n",
            error.message,
          );
        }
      });

      console.log(`${handler.name} registered for event ${event}`);
    }
  }
};
