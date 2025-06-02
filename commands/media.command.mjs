import wa from "whatsapp-web.js";
import { downloadVideo } from "../utils/downloadVideo.mjs";
import { getFileSizeInMb } from "../utils/getFileSizeInMb.mjs";
import { downloadCache } from "../utils/cache.mjs";
import { logger } from "../utils/log/log.mjs";
import { extractUrl } from "../utils/extractUrl.mjs";

const { MessageMedia } = wa;

export const download = async (message) => {
	const { body } = message;
	let urls, replyMsg;

	if (message.hasQuotedMsg) {
		const quotedMsg = await message.getQuotedMessage();
		urls = extractUrl(quotedMsg.body);
		replyMsg = quotedMsg;
	} else {
		urls = extractUrl(body);
		replyMsg = message;
	}

	if (urls.length === 0) {
		message.reply("Please provide a video URL.");
		return false;
	}

	// download all the urls
	const downloadPromises = urls.map(
		async (url) => await downloadSingleVideo(replyMsg, url)
	);

	const downloadStatus = await Promise.allSettled(downloadPromises);

	// check if all downloads were successful
	let returnStatus = false;
	if (downloadStatus.every((status) => status.status === "fulfilled"))
		returnStatus = true;
	else {
		// if any download failed, log the error
		downloadStatus.forEach(({ status, reason }, index) => {
			if (status === "rejected") {
				const errorMessage = `Failed to download video from URL: ${urls[index]}\nError: ${reason}`;

				logger.error(errorMessage);
				message.reply(errorMessage);
			}
		});
	}

	return returnStatus;
};

const downloadSingleVideo = async (message, url) => {
	// cache hit
	const cachedFile = await downloadCache.get(url);
	if (cachedFile) {
		const media = MessageMedia.fromFilePath(cachedFile);
		message.reply(media);
		return true;
	}

	// cache miss
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
	await message.reply(media);
};
