const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = Schema({
    code: {
        type: String,
        required: true
    },
    value:{
        type:String,
        required: true
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Discount', discountSchema);