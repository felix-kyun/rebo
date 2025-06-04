import PinoPretty from "pino-pretty";

export default (opts) =>
    PinoPretty({
        ...opts,
        customPrettifiers: {
            time: (time) => {
                return time.split(".")[0];
            },

            level: (level) => {
                const levels = {
                    60: "💀",
                    50: "🚨",
                    40: "⚠️",
                    30: "✨",
                    20: "🐛",
                    10: "🔍",
                };

                return levels[level] || level;
            },
        },
    });
