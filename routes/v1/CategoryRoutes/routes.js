const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../../../utils/Auth/authentication');
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../../../services/v1/categoryServices/controller');

// Create a new category (admin only)
router.post('/addcategory', authenticateToken, isAdmin, createCategory);

// Get all categories
router.get('/getall', getAllCategories);

// Get a single category by ID
router.get('/:id', getCategoryById);

// Update a category by ID (admin only)
router.put('/:id', authenticateToken, isAdmin, updateCategory);

// Delete a category by ID (admin only)
router.delete('/:id', authenticateToken, isAdmin, deleteCategory);

module.exports = router;