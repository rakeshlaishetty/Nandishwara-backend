const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../../../utils/Auth/authentication');
const {
    addToCart, removeFromCart, deleteCart, updateQuantity,getCartItems
} = require('../../../services/v1/cartServices/controller');

router.post('/addtocart', authenticateToken, addToCart);

router.get('/get', authenticateToken, getCartItems);

router.post('/updatequnatity', authenticateToken, updateQuantity);

router.post('/remove', authenticateToken, removeFromCart);

router.post('/empty', authenticateToken, deleteCart);

module.exports = router;