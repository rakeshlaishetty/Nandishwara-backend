const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generateReview = require("../utils/generateReview")

const commentSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    commentMessage: {
        type: String,
        required: true
    },
    photos: {
        type: [String]
    }
});

// Generate values for any fields if needed
commentSchema.pre('save', function(next) {
    if (!this.review) {
        this.review = generateReview();
    }
    next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
