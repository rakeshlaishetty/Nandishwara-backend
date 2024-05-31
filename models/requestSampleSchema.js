const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const SampleRequestSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'confirmed', 'approved'], default: 'pending' },
    tracker: String,
    requestDate: { type: Date, default: Date.now },
    expectedDeliveryDate: {
        type: Date,
        default: function () {
            const twoDaysAfterRequest = new Date();
            twoDaysAfterRequest.setDate(this.requestDate.getDate() + 2);
            return twoDaysAfterRequest;
        }
    },
    comments: String,
    address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    contactInfo: {
        email: String,
        phone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number! Must be exactly 10 digits.`
            },
            required: true
        }
    }
});

const sampleRequests = mongoose.model("sampleRequests",SampleRequestSchema)