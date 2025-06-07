import { logger } from "../utils/log/log.mjs";

export async function debugLogger(message) {
    const {
        user: { name },
        body,
    } = message;

    logger.debug(`${name} :: ${body}`);

    return true;
}
