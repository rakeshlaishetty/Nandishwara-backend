const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentDetailSchema = new Schema({
    method: {
        type: String,
        enum: ['COD', 'PREPAID'],
        required: true
    },
    paymentId: {
        type: String,
        default:null
    },
    status: {
        type: String,
        default: 'Pending'
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR' // Default currency
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

const PaymentDetail = mongoose.model('PaymentDetail', paymentDetailSchema);

module.exports = PaymentDetail;
