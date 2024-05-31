const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1,max:4 },
    commentMessage: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'shipped', 'confirmed', 'approved'], default: 'pending' },
    tracker: { type: String, trim: true },
    paymentId: { type: Schema.Types.ObjectId, ref: 'PaymentDetail' },
    address: { type: Schema.Types.ObjectId, required: true, ref: 'Address' }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
