const fs = require("fs")
const deleteFileWithRetry = async (filePath, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await fs.unlinkSync(filePath);
            console.log(`Successfully deleted local file: ${filePath}`);
            return;
        } catch (error) {
            console.error(`Failed to delete local file: ${filePath}`, error);
            if (i < retries - 1) {
                console.log(`Retrying deletion after ${delay} milliseconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    console.error(`Failed to delete local file after ${retries} retries: ${filePath}`);
};

module.exports = deleteFileWithRetry