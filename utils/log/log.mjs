import pino from "pino";
import { resolve } from "path";
import { LOG_LEVEL } from "../config/config.mjs";

export const logger = pino({
    level: LOG_LEVEL,
    transport: {
        targets: [
            // 'pino-pretty'
            {
                target: "./pino-pretty-transport.mjs",
                level: LOG_LEVEL,
                options: {
                    colorize: true,
                    ignore: "pid,hostname",
                },
            },

            // app.log
            {
                target: "pino/file",
                level: LOG_LEVEL,
                options: {
                    destination: resolve("app.log"),
                    mkdir: true,
                    append: false,
                },
            },
        ],
    },
});
