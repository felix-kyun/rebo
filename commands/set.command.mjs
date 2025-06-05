export async function setHandler(message) {
    const [key, value] = message.args;
    const { user } = message;
    if (!key || !value) throw new Error("Key and value must be provided");

    user.pref[key] = value;
    await user.save();

    return true;
}
