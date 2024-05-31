const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    categoryName: { type: String, required: true, trim: true,unique:true },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'ProductCategory', default: null },
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;
