import wa from "whatsapp-web.js";
import { downloadVideo } from "../utils/downloadVideo.mjs";
import { getFileSizeInMb } from "../utils/getFileSizeInMb.mjs";
import { downloadCache } from "../utils/cache.mjs";
import { logger } from "../utils/log/log.mjs";

const { MessageMedia } = wa;

export const download = async (message) => {
	const { body } = message;
	let url, replyMsg;

	if (message.hasQuotedMsg) {
		const quotedMsg = await message.getQuotedMessage();
		url = quotedMsg.body;
		replyMsg = quotedMsg;
	} else {
		url = body.split(" ")[1];
		replyMsg = message;
	}

	if (!url) {
		message.reply("Please provide a video URL.");
		return false;
	}

	// check cache
	const cachedFile = await downloadCache.get(url);
	if (cachedFile) {
		const media = MessageMedia.fromFilePath(cachedFile);
		replyMsg.reply(media);
		return true;
	}

	let videoPath = await downloadVideo(url);
	const fileSize = await getFileSizeInMb(videoPath);

	if (fileSize > 50) {
		throw new Error(
			"File size exceeds 50MB limit imposed by whatsapp-web.js"
		);
	}

	// save to cache
	downloadCache.add(url, videoPath);
	logger.info(`[cache set]: ${url} -> ${videoPath.split("/").pop()}`);

	const media = MessageMedia.fromFilePath(videoPath);
	await replyMsg.reply(media);

	return true;
};
