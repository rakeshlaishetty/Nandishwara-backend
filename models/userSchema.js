const mongoose = require('mongoose');
const { ROLES } = require('../utils/roles');
const Role = require('../models/roleSchema')
const Order = require('../models/orderSchema')
const Address = require('../models/addressSchema')
const CartItem = require('../models/cartItemSchema')
const sampleRequests = require('../models/requestSampleSchema')



const Schema = mongoose.Schema;

// enquiries: [{ type: Schema.Types.ObjectId, ref: 'Enquiry' }],
// Define the User schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    whatsappNumber: { type: String, required: true,unique:true},
    photoOfBusiness: { type: String, required: function () { return this.role === ROLES.SHOP_OWNER; } },
    status: { type: Boolean, default: function () { return this.role !== ROLES.SHOP_OWNER; } },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
    cart_items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
    sampleRequests: [{ type: Schema.Types.ObjectId, ref: 'SampleRequest' }],
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true, },
    isBlocked: { type: Boolean, default: false }
});

// Pre-save hook to enforce mandatory fields based on role
userSchema.pre('save', function (next) {
    if (this.role === ROLES.SHOP_OWNER) {
        if (this.role === ROLES.SHOP_OWNER && !this.photoOfBusiness) {
            return next(new Error('photoOfBusiness is required for shop owners'));
        }

        this.status = false;
    }
    this.sampleRequests = undefined;
    this.enquiries = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User
