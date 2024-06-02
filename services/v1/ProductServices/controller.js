const Product = require('../../../models/ProductSchema');
const ProductVariation = require('../../../models/ProductVariationSchema');
const { successResponse } = require('../../../utils/response');
const uploadToFirebase = require("../../../firebase/uploadToFirebase")
const deleteFileWithRetry = require("../../../utils/deletefiles")
const mongoose = require("mongoose")

const createProduct = async (req, res, next) => {
    const { productName, description, salePrice, ownerPrice, quantity, status, productCategory, variations, brand } = JSON.parse(JSON.stringify(req.body));


    const parsedVariations = JSON.parse(variations);
    try {
        const files = req.files;
        if (!files || files?.length == 0) {
            throw new Error("No files uploaded")
        }

        const productImages = []
        for (let file of files) {
            const publicurl = await uploadToFirebase(file);
            console.log(publicurl, "publicurl")
            productImages.push(publicurl)
            await deleteFileWithRetry(file.path)
        }

        // Create product variations
        const variationIds = [];
        if (parsedVariations && parsedVariations.length > 0) {
            for (const variation of parsedVariations) {
                const newVariation = new ProductVariation(variation);
                const savedVariation = await newVariation.save();
                variationIds.push(savedVariation._id);
            }
        }

        // Create product
        const productData = {
            productName,
            description,
            salePrice,
            ownerPrice,
            quantity,
            status,
            productCategory,
            variations: variationIds,
            productImages,
            brand
        };
        const product = new Product(productData);
        await product.save();

        return successResponse(res, 201, product, 'Product created successfully.');
    } catch (error) {
        console.log(error)
        next(error);
    }
};


const getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search = '', status, sort = 'asc' } = req.query;

        // Convert query parameters to appropriate types
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;
        const sortOrder = sort === 'asc' ? 1 : -1;

        // Build query object
        const query = {};
        if (search) {
            query.productName = { $regex: search, $options: 'i' }; // case-insensitive search
        }
        if (status) {
            query.status = status;
        }
        console.log(query, 'query')
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .sort({ salePrice: sortOrder })
                .skip(skip)
                .limit(limitNumber)
        ]);


        const pagination = {
            total,
            page: pageNumber,
            pages: Math.ceil(total / limitNumber),
            limit: limitNumber
        };

        return successResponse(res, 200, { products, pagination }, 'Products retrieved successfully.');
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        // const productId = req.params.id;
        const { updateData, productId } = req.body;

        // Define valid fields for update
        const validFields = [
            'productName',
            'description',
            'salePrice',
            'ownerPrice',
            'quantity',
            'status',
            'productCategory',
            'variations',
            'productImages',
            'brand'
        ];

        // Filter updateData to include only valid fields
        const filteredUpdateData = {};
        validFields.forEach(field => {
            if (updateData[field] !== undefined) {
                filteredUpdateData[field] = updateData[field];
            }
        });


        if (filteredUpdateData.ownerPrice !== undefined && filteredUpdateData.salePrice !== undefined) {
            if (filteredUpdateData.ownerPrice <= filteredUpdateData.salePrice) {
                throw new Error('Owner price must be greater than sale price');
            }
        }


        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            filteredUpdateData,
            { new: true, runValidators: true }
        ).populate('productCategory').populate('variations');

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return successResponse(res, 200, updatedProduct, 'Product updated successfully.');
    } catch (error) {
        next(error);
    }
};


const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.body;

        // Start a transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Delete the product
            const deletedProduct = await Product.findByIdAndDelete(productId).session(session);

            // Check if the product was found and deleted
            if (!deletedProduct) {
                throw new Error('Product not found');
            }

            // Delete associated product variations
            await ProductVariation.deleteMany({ _id: { $in: deletedProduct.variations } }).session(session);

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return successResponse(res, 200, deletedProduct, 'Product deleted successfully.');
        } catch (error) {
            // Rollback the transaction in case of any error
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    } catch (error) {
        next(error);
    }
};


module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
