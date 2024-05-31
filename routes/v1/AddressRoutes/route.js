const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../../../utils/Auth/authentication');
const {
    createAddress, deleteAddress, updateAddress, getAddress
} = require('../../../services/v1/addressServices/controller');

// Create a new category (admin only)
router.post('/add', authenticateToken, createAddress);

// Get all categories
router.get('/getall', authenticateToken,getAddress);

// Update a category by ID (admin only)
router.put('/update', authenticateToken, updateAddress);

// Delete a category by ID (admin only)
router.post('/delete', authenticateToken, deleteAddress);

module.exports = router;