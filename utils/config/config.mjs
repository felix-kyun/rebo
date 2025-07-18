import { config } from "dotenv";
import packageJson from "../../package.json" with { type: "json" };
import { dirname, resolve } from "path";
import { Mutex } from "../mutex/Mutex.mjs";
export const ENV = process.env.NODE_ENV || "development";
export const __dirname = resolve(dirname(process.argv[1]));

// map env to their config files
const configFile = {
    development: ".dev.env",
    production: ".env",
    test: ".test.env",
};

config({
    path: configFile[ENV],
});

export const MONGO_URI = process.env.MONGO_URI;
export const PREFIX = process.env.PREFIX || "/";
export const pkg = packageJson;
export const LOGFILE = process.env.LOGFILE || "app.log";
export const LOG_LEVEL = process.env.LOG_LEVEL || "info";
export const OPENAI_KEY = process.env.OPENAI_KEY;
export const MAX_PARALLEL_DOWNLOADS =
    parseInt(process.env.MAX_PARALLEL_DOWNLOADS, 10) || 2;

// to keep track of bot's own messages
export const BOT_MESSAGES = new Set();
export const replyMutex = new Mutex();
export const BOT_STATE = {
    isCurrentReplying: false,
};

// remember this file should be loaded before any other file
console.clear();

// show env specific env vars in debug mode
if (ENV === "development" && LOG_LEVEL === "debug") {
    process.stdout.write("Env ");
    console.dir({ PREFIX, LOG_LEVEL, LOGFILE, ENV }, { compact: false });
}
