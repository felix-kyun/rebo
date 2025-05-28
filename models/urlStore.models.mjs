import mongoose from "mongoose";

const UrlSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

export const Url = mongoose.model("Url", UrlSchema, "UrlStore");
