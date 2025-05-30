import { client } from "./client.mjs";
import { genQr } from "./utils/genQr.mjs";
import "./attachListeners.mjs";
import "./handlers/index.handler.mjs";
import { mongoConnect } from "./utils/db/dbConnect.mjs";
import { logger } from "./utils/log/log.mjs";

// generate qr code in terminal
logger.info("Generating QR code...");
client.on("qr", genQr);

// connect to MongoDB
logger.info("Connecting to MongoDB...");
await mongoConnect();

logger.info("Connected to MongoDB!");
client.initialize();
