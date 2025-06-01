import { chatCompletion } from "../utils/openai/openai.mjs";

export async function ai(message) {
	const prompt = message.args.join(" ").trim();
	if (!prompt) {
		await message.reply("Please provide a prompt for the AI.");
		return false;
	}

	const rawResponse = await chatCompletion(prompt);
	const response = rawResponse.choices[0].message.content.trim();
	await message.reply(response);

	return true;
}
