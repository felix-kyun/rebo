/*
 * Registers event handler for a client
 * @param {Client} client - The client to register the handler for
 * @param {Array<function (message: Message): Void>} handlers - List of handlers to register
 * @returns {void}
 */
export const registerHandlers = (client, handlers) => {
  for (const [event, handlerArray] of Object.entries(handlers)) {
    for (const handler of handlerArray) {
      client.on(event, (message) => {
        handler(message);
      });
    }
  }
};
