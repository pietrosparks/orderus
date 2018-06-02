const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Food', foodSchema);