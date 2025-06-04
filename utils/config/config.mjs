import { config } from "dotenv";
import packageJson from "../../package.json" with { type: "json" };
import { dirname, resolve } from "path";
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

// remember this file should be loaded before any other file
console.clear();

// show env specific env vars in debug mode
if (ENV === "development" && LOG_LEVEL === "debug") {
    process.stdout.write("Env ");
    console.dir({ PREFIX, LOG_LEVEL, LOGFILE, ENV }, { compact: false });
}
