export async function info(message) {
  const { wid } = message.client.info;

  message.reply(
    `nodejs version: ${process.version}
uptime: ${Math.floor(process.uptime() / 60)} minutes
platform: ${process.platform}
wid: ${wid._serialized}`,
  );
  message.react("ℹ️");

  return true;
}
