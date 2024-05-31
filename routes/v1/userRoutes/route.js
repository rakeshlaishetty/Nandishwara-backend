const express = require('express');
const router = express.Router();
const { register,validateUserInput, login,logout } = require("../../../services/v1/userServices/controller")




// Validate user input

// Register a new user
router.post('/register', validateUserInput,register);
router.post('/login', login);
router.get('/logout',logout);

module.exports = router;
