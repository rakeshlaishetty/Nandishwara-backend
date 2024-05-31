const bcrypt = require("bcryptjs")
const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        // Compare passwords
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        // Handle error
        console.error('Error comparing passwords:', error);
        throw error;
    }
};

module.exports = comparePasswords