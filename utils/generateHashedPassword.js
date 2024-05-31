const bcrypt = require('bcryptjs');

// Function to generate a hashed password
const generateHashedPassword = async (password) => {
    try {
        const saltRounds = Number(process.env.SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error generating hashed password: ' + error.message);
    }
};

module.exports = generateHashedPassword;
