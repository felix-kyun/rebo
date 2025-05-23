import { client } from "./client.mjs";
import { genQr } from "./utils/genQr.mjs";
import "./attachListeners.mjs";
import "./handlers/index.handler.mjs";

// generate qr code in terminal
client.on("qr", genQr);

client.initialize();
