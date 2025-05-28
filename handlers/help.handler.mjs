import { pkg } from "../utils/config.mjs";

export function help(message) {
  message.reply(
    `Available commands:
  /help - Show this help message
  /ping [arg] - Respond with Pong
  /info - Show bot information
  /download [url] - Download media(video) from a URL

ReBo v${pkg.version}
made by @felix-kyun`,
  );

  return true;
}
