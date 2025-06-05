import { hello } from "./testCommands/hello.test.command.mjs";
import { caption } from "./testCommands/imageCaption.test.command.mjs";

const testCommands = {
    hello,
    caption,
};
export async function test(message) {
    const { args } = message;
    const command = args.shift();

    if (command && testCommands[command]) {
        return await testCommands[command](message);
    }

    return false;
}
