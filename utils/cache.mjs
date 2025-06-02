import { Url } from "../models/urlStore.models.mjs";

export const downloadCache = {
    add: async (url, filename) => {
        await Url.create({ url, filename });
    },

    get: async (url) => {
        const cachedEntry = await Url.findOne({ url });
        return cachedEntry ? cachedEntry.filename : null;
    },
};
