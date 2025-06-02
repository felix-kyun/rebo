import { stat } from "fs/promises";

export const getFileSizeInMb = async (filePath) => {
    try {
        const info = await stat(filePath);
        return info.size / (1024 * 1024);
    } catch (error) {
        throw new Error("Error getting file size: " + error.message);
    }
};
