import { logger } from "../utils/log/log.mjs";
import { chatCompletion } from "../utils/openai/openai.mjs";

export async function ai(message) {
	const prompt = message.args.join(" ").trim();
	if (!prompt) {
		await message.reply("Please provide a prompt for the AI.");
		return false;
	}

	const response = await chatCompletion(prompt);
	await message.reply(response);

	return true;
}
