import "dotenv/config";
import packageJson from "../package.json" with { type: "json" };

export const MONGO_URI = process.env.MONGO_URI;
export const PREFIX = process.env.PREFIX || "/";
export const pkg = packageJson;
