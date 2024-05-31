const ProductCategory = require('../../../models/productCategorySchema');
const { errorResponse, successResponse } = require('../../../utils/response');

const createCategory = async (req, res, next) => {
    const { categoryName, parentCategory } = req.body;

    try {
        const data = { categoryName: categoryName }
        if (parentCategory) {
            data.parentCategory = parentCategory
        }
        const category = new ProductCategory(data)
        await category.save()

        return successResponse(res, 201, category, 'Category created successfully.');
    } catch (error) {
        next(error);
    }
};


// Get all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await ProductCategory.find()
        const cate = nestedCategories(categories)
        return successResponse(res, 200, cate, 'Categories retrieved successfully.');
    } catch (error) {
        next(error)
    }
};

const nestedCategories = (categories, parentId = null) => {
    const categoryList = [];
    const filteredCategories = parentId === null ?
        categories.filter(cat => cat.parentCategory === null) :
        categories.filter(cat => String(cat.parentCategory) === String(parentId));

    for (const category of filteredCategories) {
        const subCategories = nestedCategories(categories, category._id);
        categoryList.push({
            _id: category._id,
            categoryName: category.categoryName,
            sub_categories: subCategories
        });
    }

    return categoryList;
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await ProductCategory.findById(req.params.id)
        if (!category) return errorResponse(res, 404, 'Category not found.');
        return successResponse(res, 200, category, 'Category retrieved successfully.');
    } catch (error) {
        return errorResponse(res, 500, 'Failed to retrieve category.', error);
    }
};

// Update a category by ID
const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.params)
    const { categoryName, parentCategory } = req.body;

    try {
        // Fetch the category to be updated
        const category = await ProductCategory.findById(id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found.');
        }

        // Update the category fields
        if (categoryName) category.categoryName = categoryName;

        // Handle parent category update
        if (parentCategory && parentCategory !== String(category.parentCategory)) {
            // Check if the new parent category exists
            const parent = await ProductCategory.findById(parentCategory);
            if (!parent) {
                return errorResponse(res, 404, 'Parent category not found.');
            }

            // Remove the category from the old parent's subCategories if it had a parent
            if (category.parentCategory) {
                await ProductCategory.findByIdAndUpdate(category.parentCategory, {
                    $pull: { subCategories: category._id }
                });
            }

            // Add the category to the new parent's subCategories
            category.parentCategory = parent._id;
            await ProductCategory.findByIdAndUpdate(parentCategory, {
                $push: { subCategories: category._id }
            });
        }

        // Save the updated category
        await category.save();

        return successResponse(res, 200, category, 'Category updated successfully.');
    } catch (error) {
        next(error);
    }
};

module.exports = { updateCategory };


// Delete a category by ID
const deleteCategory = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the category to be deleted
        const category = await ProductCategory.findById(id);
        if (!category) {
            return errorResponse(res, 404, 'Category not found.');
        }

        // If the category has subcategories, handle them appropriately
        if (category.subCategories && category.subCategories.length > 0) {
            for (let subCategoryId of category.subCategories) {
                await ProductCategory.findByIdAndDelete(subCategoryId);
            }
        }

        // If the category has a parent, remove it from the parent's subCategories array
        if (category.parentCategory) {
            await ProductCategory.findByIdAndUpdate(category.parentCategory, {
                $pull: { subCategories: category._id }
            });
        }

        // Delete the category
        await ProductCategory.findByIdAndDelete(id);

        return successResponse(res, 200, null, 'Category deleted successfully.');
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
