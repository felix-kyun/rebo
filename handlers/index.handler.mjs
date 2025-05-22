import { client } from "../client.mjs";
import { registerHandlers } from "../utils/attachHandlers.mjs";
import { pingHandler } from "./ping.handler.mjs";

const handlers = {
  message_create: [pingHandler],
};

registerHandlers(client, handlers);
