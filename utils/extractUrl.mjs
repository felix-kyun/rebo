export const extractUrl = (content) => {
    const regex = /https?:\/\/[^\s]+/g;

    return content.match(regex) || [];
};
