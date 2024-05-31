const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    salePrice: { type: Number, required: true, min: 0 },
    ownerPrice: { type: Number, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    status: { type: String, required: true, enum: ['available', 'out of stock', 'discontinued'], default: 'available' },
    productCategory: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
    variations: [{ type: Schema.Types.ObjectId, ref: "ProductVariation" }],
    productImages: [{ type: String, trim: true }],
    brand: { type: String, trim: true }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
