const mongoose = require("mongoose");

const ItemModel = mongoose.model('Item', {
    _id: String,
    name: String,
    price: Number,
    qty: Number
});
module.exports = ItemModel;