const mongoose = require('mongoose');

const CustomerModel = mongoose.model('Customer', {
    _id: String,
    name: String,
    address: String,
    salary: Number,
});

module.exports = CustomerModel;
