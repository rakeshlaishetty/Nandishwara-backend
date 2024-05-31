const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleName: { type: String, required: true,unique:true }
},{
    timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);
