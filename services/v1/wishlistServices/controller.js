const Wishlist = require("../../../models/wishlistSchmea");
const { errorResponse, successResponse } = require("../../../utils/response");

const createWishlist = async (userId) => {
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
        wishlist = new Wishlist({ user: userId, products: [] });
    }
    return wishlist

}
const addToWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.body.productId;

        let wishlist = await createWishlist(userId)

        // Check if the product is already in the wishlist
        if (wishlist.products.includes(productId)) {
            throw new Error('Product already exists in the wishlist')
        }

        wishlist.products.push(productId);
        await wishlist.save();
        successResponse(res, 200, wishlist, 'Product added to wishlist successfully')
    } catch (error) {
        console.error(error);
        next(error)
    }
};

const removeFromWishList = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const productId = req.body.productId;

        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            // If wishlist not found, return error
            res.status(400)
            throw new Error("Wishlist not found")
        }

        // Check if the product exists in the wishlist
        const index = wishlist.products.indexOf(productId);
        if (index === -1) {
            throw new Error('Product does not exist in the wishlist')
        }

        wishlist.products.splice(index, 1);
        await wishlist.save();
        successResponse(res, 200, wishlist, 'Product removed to wishlist successfully')
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const getWishlist = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
        if (!wishlist) {
            throw new Error("Wishlist not found")
        }

        successResponse(res, 200, wishlist, 'Product added to wishlist successfully')
    } catch (error) {
        console.error(error);
        next(error)
    }
}
module.exports = { addToWishlist, removeFromWishList, getWishlist,createWishlist }