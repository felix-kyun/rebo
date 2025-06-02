import { client } from "./client.mjs";
import { commands } from "./commands/index.command.mjs";
import { middlewares } from "./middlewares/index.middleware.mjs";
import { logger } from "./utils/log/log.mjs";
import { registerCommands } from "./utils/registerCommands.mjs";
import { registerHandlers } from "./utils/registerHandlers.mjs";
import { registerMiddlewares } from "./utils/registerMiddlewares.mjs";

// log ready
client.once("ready", () => logger.info("Client is ready!"));

// log when authenticated
client.on("authenticated", () => logger.info("Client is authenticated!"));

// set offline by default
client.on("ready", async () => {
	await client.sendPresenceUnavailable();

	registerMiddlewares(client, middlewares);
	registerCommands(client, commands);

	registerHandlers(client);
});
