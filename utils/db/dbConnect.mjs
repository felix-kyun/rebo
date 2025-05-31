import mongoose from "mongoose";
import { MONGO_URI } from "../config/config.mjs";
import { logger } from "../log/log.mjs";

export async function mongoConnect() {
	try {
		await mongoose.connect(MONGO_URI);
		logger.info("Connected to MongoDB!");
	} catch (error) {
		logger.fatal("Failed to connect to MongoDB", error);
		process.exit(1);
	}
}
