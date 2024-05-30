const mongoose = require('mongoose');
const { ROLES } = require('../utils/roles')
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    photoOfBusiness: { type: String, required: function () { return this.role == ROLES.SHOP_OWNER } },
    status: { type: Boolean, default: function () { return this.role != ROLES.SHOP_OWNER } },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    enquiries: [{ type: Schema.Types.ObjectId, ref: 'Enquiry' }],
    sampleRequests: [{ type: Schema.Types.ObjectId, ref: 'SampleRequest' }],
    password: { type: String, required: true },
    role: { type: String, required: true }
});

// Pre-save hook to enforce mandatory fields based on role
userSchema.pre('save', function (next) {
    if (this.role === ROLES.SHOP_OWNER ) {
        if (!this.photoOfBusiness) {
            return next(new Error('photoOfBusiness is required for shop owners'));
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
