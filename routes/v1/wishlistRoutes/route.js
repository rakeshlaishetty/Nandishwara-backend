const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../../../utils/Auth/authentication');
const { addToWishlist,removeFromWishList,getWishlist } = require('../../../services/v1/wishlistServices/controller.js');

router.post('/add', authenticateToken, addToWishlist);
router.post('/get', authenticateToken, getWishlist);
router.post('/remove', authenticateToken, removeFromWishList);


module.exports = router;