const mongoose = require('mongoose');

const OrderModel = mongoose.model('Order', {
    _id: String,
    customer: Object,
    items: [{
        item_id: String,
        item_name: String,
        item_price: Number,
        item_qty: Number,
        item_total: Number
    }],
    order_total: Number,
    discount: Number,
    order_date: Date
});

module.exports = OrderModel;
