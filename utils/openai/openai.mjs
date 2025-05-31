import OpenAI from "openai";
import { OPENAI_KEY } from "../config/config.mjs";
import { logger } from "../log/log.mjs";

const openai = new OpenAI({
	apiKey: OPENAI_KEY,
	baseURL: "https://openrouter.ai/api/v1",
});

export async function chatCompletion(
	prompt,
	model = "deepseek/deepseek-r1-0528:free"
) {
	try {
		const response = await openai.chat.completions.create({
			model,
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{ role: "user", content: prompt },
			],
		});

		return response.choices[0].message.content.trim();
	} catch (error) {
		throw new Error(`OpenAI API error: ${error.message}`);
	}
}
