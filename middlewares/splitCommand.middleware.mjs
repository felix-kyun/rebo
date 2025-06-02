export const splitCommand = (message) => {
	if (!message.body.startsWith("/")) return;

	// Split the message into command and arguments
	const parts = message.body.split(" ");
	const command = parts[0].substring(1);
	const args = parts.slice(1);

	message.command = command;
	message.args = args;

	return;
};
