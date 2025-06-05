export async function user(message) {
    message.reply(JSON.stringify(message.user));
    return true;
}
