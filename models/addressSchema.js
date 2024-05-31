const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: { type: String, required: true },
    flatNo: { type: String, required: true },
    buildingName: { type: String },
    areaName: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    district: { type: String },
    pinCode: { type: String, required: true },
    state: { type: String, required: true }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address