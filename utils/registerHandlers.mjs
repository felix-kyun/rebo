import { BOT_MESSAGES, PREFIX } from "./config/config.mjs";
import { logger } from "./log/log.mjs";

/*
 * Registers event handler for a client
 * @param {Client} client - The client to register the handler for
 * @returns {void}
 */

export const registerHandlers = (client) => {
    const { commands, middlewares } = client;

    logger.debug(
        `Avaliable Middlwares: ${middlewares.map((f) => f.name).join(", ")}`,
    );

    for (const [event, availiableCommands] of Object.entries(commands)) {
        client.on(event, async (message) => {
            // skip bot's own messages
            if (BOT_MESSAGES.has(message.id._serialized)) return;

            // run middleware first
            for (const middleware of middlewares) {
                const ret = await middleware(message);
                if (ret === false) {
                    logger.warn(
                        `Middleware ${middleware.name} blocked the message.`,
                    );
                    return; // stop processing if middleware returns false
                }
            }

            // if the message is not a command, return
            if (!message.body.startsWith(PREFIX)) return;

            const { command } = message;
            // check if the such a command exists
            if (availiableCommands[command]) {
                try {
                    // preliminary stuff to ensure client is not blocked
                    await client.sendPresenceAvailable();
                    const chat = await message.getChat();
                    await chat.sendSeen();
                    await message.wait();

                    // call the handler
                    const ret = await availiableCommands[command](message);

                    // notify the user of success or failure
                    if (ret) await message.success();
                    else await message.fail();
                } catch (error) {
                    logger.error(
                        error,
                        `Error in ${availiableCommands[command].name} handler`,
                    );

                    // wrap in try-catch to handle even reply errors
                    try {
                        await message.fail();
                        await message.reply(
                            "*Error: * ```" + error.message + "```",
                        );
                    } catch (replyError) {
                        logger.error("Failed to send error reply:", replyError);
                    }
                } finally {
                    await client.sendPresenceUnavailable();
                }
            } else {
                await message.fail();
                return;
            }
        });

        logger.debug(
            `Registered ${Object.keys(availiableCommands).join(", ")} for ${event}`,
        );
    }
};
