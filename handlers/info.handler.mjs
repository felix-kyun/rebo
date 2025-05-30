import { pkg } from "../utils/config/config.mjs";

export async function info(message) {
	const { wid } = message.client.info;

	await message.reply(
		`nodejs version: ${process.version}
uptime: ${Math.floor(process.uptime() / 60)} minutes
platform: ${process.platform}
wid: ${wid._serialized}
ReBo version: ${pkg.version}`
	);
	message.react("ℹ️");

	return true;
}
