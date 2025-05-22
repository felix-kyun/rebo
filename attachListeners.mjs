import { client } from "./client.mjs";

// log ready
client.once("ready", () => console.log("Client is ready!"));

// log when authenticated
client.on("authenticated", () => console.log("Client is authenticated!"));
