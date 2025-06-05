import { pkg, PREFIX } from "../utils/config/config.mjs";

export function help(message) {
    message.reply(
        `Available commands:
  /help - Show this help message
  /ping [arg] - Respond with Pong
  /info - Show bot information
  /download [url] - Download media(video) from a URL
  /set option true|false - Set a configuration option
  /get option - Get the value of a configuration option
  /user - Show user information
  /ai [prompt] - Interact with the AI model
  /echo [text] - Echo the provided text

ReBo v${pkg.version}
made by @felix-kyun`.replaceAll("/", PREFIX),
    );

    return true;
}
