const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
        index:true
    },
    customer: {
        type: Object, 
        required: true
    },
    status:{
        type: String,
        required: true
    },
    order:{
        type: Array, 
        default: []
    },
    discount: {
        type: Object
    },
    total:{
        type: String,
        required: true
    },
    qr:{
        type:String
    },
    tableNo:{
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps:true})

module.exports = mongoose.model('Order', orderSchema);