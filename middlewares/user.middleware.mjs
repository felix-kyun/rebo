import { User } from "../models/user.model.mjs";
import { logger } from "../utils/log/log.mjs";

export const userMiddleware = async (message) => {
    const {
        id: { _serialized: id },
        name,
        isGroup,
    } = await message.getChat();

    const user = await User.findOne({ id });

    logger.debug(`message ${JSON.stringify(user)}`);

    if (!user) {
        const newUser = await User.create({
            id,
            name,
            type: isGroup ? "group" : "individual",
        });
        message.user = newUser;
    } else {
        message.user = user;
    }

    return true;
};
