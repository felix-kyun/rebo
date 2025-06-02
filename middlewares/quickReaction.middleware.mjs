export const quickReaction = async (message) => {
	message.wait = async () => message.react("⌛");
	message.success = async () => message.react("✅");
	message.fail = async () => message.react("❌");

	return;
};
