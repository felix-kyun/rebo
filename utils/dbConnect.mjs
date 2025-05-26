import mongoose from "mongoose";
import { MONGO_URI } from "./config.mjs";

export async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}
