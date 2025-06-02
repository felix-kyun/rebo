import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
	chatId: {
		type: String,
		required: true,
		unique: true,
	},
	chatName: {
		type: String,
		required: true,
	},
	chatType: {
		type: String,
		required: true,
		enum: ["group", "individual"],
	},
	preferences: {
		type: Object,
		default: {},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export const Chat = mongoose.model("Chat", ChatSchema, "chats");
