export const handleSafely = async (message, callback) => {
  try {
    const result = await callback(message);
    return result;
  } catch (error) {
    console.error("Error in handler:", error);
    message.reply(
      "An error occurred while processing your request. Please try again.\n",
      error.message,
    );
  }
};
