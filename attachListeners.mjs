import { client } from "./client.mjs";
import { logger } from "./utils/log/log.mjs";

// log ready
client.once("ready", () => logger.info("Client is ready!"));

// log when authenticated
client.on("authenticated", () => logger.info("Client is authenticated!"));

// set offline by default
client.on("ready", () => {
	client.sendPresenceUnavailable();
});
