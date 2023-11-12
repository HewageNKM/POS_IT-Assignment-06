const router = require('express').Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//DB Connection
const mongoose = require('../db/DB');
const OrderModel = require('../public/model/OrderModel');

router.get('/orders', async function (req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const orders = await OrderModel.find();
        await session.commitTransaction();
        if (orders) {
            console.log("Orders Sent");
            res.status(200).json(orders);
        } else {
            console.log("Orders Not Found");
            res.status(404).json("Orders Not Found");
        }
    }catch (error){
        await session.abortTransaction();
        console.log("Error in retrieving the orders");
        res.status(500).json(error.code);
    }finally {
        await session.endSession();
    }
});
router.delete('/orders/:id', async function (req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const order = await OrderModel.findOneAndDelete({_id: req.params.id});
        await session.commitTransaction();
        if (order) {
            console.log("Order Deleted");
            res.status(200).json(order);
        } else {
            console.log("Order Not Found");
            res.status(404).json("Order Not Found");
        }
    }catch (error){
        await session.abortTransaction();
        console.log("Error in deleting the order");
        res.status(500).json(error.code);
    }finally {
        await session.endSession();
    }
});

router.get('/orders/:id', async function (req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const order = await OrderModel.findById(req.params.id);
        await session.commitTransaction();
        if (order) {
            console.log("Order Found");
            res.status(200).json(order);
        } else {
            console.log("Order Not Found");
            res.status(404).json("Order Not Found");
        }
    }catch (error){
        await session.abortTransaction();
        console.log("Error in getting the order");
        res.status(500).json(error.code);
    }finally {
        await session.endSession();
    }
});
module.exports = router;