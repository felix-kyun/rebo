import "./utils/config/config.mjs";
import { logger } from "./utils/log/log.mjs";
import { client } from "./client.mjs";
import "./attachListeners.mjs";
import { mongoConnect } from "./utils/db/dbConnect.mjs";
import { genQr } from "./utils/genQr.mjs";

// generate qr code in terminal
client.on("qr", async () => {
	logger.info("QR code generated. Scan it with your WhatsApp app.");
	genQr(client);
});

// connect to MongoDB
logger.info("Connecting to MongoDB...");
await mongoConnect();

client.initialize();
