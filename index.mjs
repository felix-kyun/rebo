import { client } from "./client.mjs";
import { genQr } from "./utils/genQr.mjs";
import "./attachListeners.mjs";
import "./handlers/index.handler.mjs";
import { mongoConnect } from "./utils/dbConnect.mjs";

// generate qr code in terminal
client.on("qr", genQr);

// connect to MongoDB
await mongoConnect();

client.initialize();
