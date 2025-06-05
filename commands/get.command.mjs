export async function getHandler(message) {
    const { user } = message;
    const [key] = message.args;

    if (!key) throw new Error("Key must be provided");

    if (!(key in user.pref)) {
        // throw new Error(`Preference key "${key}" does not exist`);
        message.reply("_not set_");
    } else message.reply(`_${user.preferences[key]}_`);

    return true;
}
