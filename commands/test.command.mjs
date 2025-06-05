import { hello } from "./testCommands/hello.test.command.mjs";

const testCommands = {
    hello,
};
export async function test(message) {
    const { args } = message;
    const command = args.shift();

    if (command && testCommands[command]) {
        return await testCommands[command](message);
    }

    return false;
}
