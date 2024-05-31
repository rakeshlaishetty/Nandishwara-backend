const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductVariationSchema = new Schema({
    attribute: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true }
});

const ProductVariation = mongoose.model('ProductVariation', ProductVariationSchema);

module.exports = ProductVariation;
