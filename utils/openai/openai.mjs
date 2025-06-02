import OpenAI from "openai";
import { OPENAI_KEY } from "../config/config.mjs";

const openai = new OpenAI({
    apiKey: OPENAI_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function chatCompletion(prompt, opts = {}) {
    try {
        const response = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            ...opts,
        });

        return response;
    } catch (error) {
        throw new Error(`OpenAI API error: ${error.message}`);
    }
}
