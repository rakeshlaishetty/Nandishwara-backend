const jwt = require('jsonwebtoken');

function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY,  {expiresIn:'30d'});
}

module.exports = generateToken
