export async function hello(message) {
    const { args } = message;

    message.reply(`Hello, ${args.join(" ") || "World"}!`);

    return true;
}
