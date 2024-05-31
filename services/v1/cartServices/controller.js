const CartItem = require('../../../models/cartItemSchema');
const User = require('../../../models/userSchema');
const { successResponse } = require("../../../utils/response")
const mongoose = require("mongoose")

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user._id;


        let cartItem = await CartItem.findOne({ user: userId }).select("-user")

        if (!cartItem) {
            cartItem = new CartItem({ user: userId, items: [{ product: productId, quantity }] });
        }


        const existingItem = Array.isArray(cartItem.items) && cartItem.items.find(item => String(item.product) === String(productId));

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItem.items.push({ product: productId, quantity });
        }

        await cartItem.save();

        return successResponse(res, 200, cartItem, 'Product added to cart successfully.');
    } catch (error) {
        next(error);
    }
};


// Remove from Cart
const removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;
        if (!productId) {
            throw new Error("Please Provide productId ")
        }

        // Find the cart item for the user
        const cartItem = await CartItem.findOne({ user: userId });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'CartItem not found.' });
        }

        console.log(cartItem.items, "cartItem.items")
        // Remove the item with the specified product ID
        cartItem.items = cartItem.items.filter((item) => {
            console.log(productId, 'productId')
            console.log(item._id, "item._id")
            return String(item._id) != String(productId)
        })
        //  String(item.product._id) !== String(productId))

        console.log(cartItem.items, "cartItem.items")
        // Save the updated cart item
        await cartItem.save();

        return res.status(200).json({ success: true, message: 'Product removed from cart successfully.' });
    } catch (error) {
        next(error);
    }
};




// Update Quantity
const updateQuantity = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Validate required fields
        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: 'productId and quantity are required.' });
        }

        const userId = req.user._id;

        // Find the cart item for the user where the product matches productId
        const cartItem = await CartItem.findOneAndUpdate(
            {
                user: userId,
                'items._id': productId
            },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'CartItem or product not found.' });
        }

        return res.status(200).json({ success: true, message: 'Quantity updated successfully.', cartItem });
    } catch (error) {
        next(error);
    }
};





// Delete Cart
const deleteCart = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Remove the cart item associated with the user
        await CartItem.deleteOne({ user: userId });

        return res.status(200).json({ success: true, message: 'Cart cleared successfully.' });
    } catch (error) {
        next(error);
    }
};

const getCartItems = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const cartItems = await CartItem.find({ user: userId }).select("-user")

        return successResponse(res, 200, cartItems, 'Product Fetched successfully.');
    } catch (error) {
        next(error);
    }
};

module.exports = { addToCart, removeFromCart, deleteCart, updateQuantity, getCartItems };
