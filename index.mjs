import { client } from "./client.mjs";
import { genQr } from "./utils/genQr.mjs";

// generate qr code in terminal
client.on("qr", genQr);

// log ready
client.once("ready", () => console.log("Client is ready!"));

// log when authenticated
client.on("authenticated", () => console.log("Client is authenticated!"));

client.initialize();
