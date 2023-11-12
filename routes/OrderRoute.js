const router = require('express').Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//DB Connection
const mongoose = require('../db/DB');


//Model
const ItemModel = require('../public/model/ItemModel');
const CustomerModel = require('../public/model/CustomerModel');
const OrderModel = require('../public/model/OrderModel')


router.get('/ids', async function (req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const itemIds = await ItemModel.find();
        const customerIds = await CustomerModel.find();
        await session.commitTransaction();
        if (itemIds || customerIds) {
            console.log("Ids Sent");
            res.status(200).json({itemIds: itemIds, customerIds: customerIds});
        } else {
            console.log("Ids Not Found");
            res.status(404).json("Ids Not Found");
        }
    }catch (error){
        await session.abortTransaction();
        console.log("Error in retrieving the ids");
        res.status(500).json(error.code);
    }finally {
        await session.endSession();
    }
});
router.post('/orders', async function (req, res) {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const customer = await CustomerModel.findOne({ _id: req.body.customer_id });
        const order = new OrderModel({
            _id: req.body._id,
            customer: customer,
            items: req.body.items,
            order_total: req.body.order_total,
            discount: req.body.discount,
            order_date: req.body.order_date
        });

        // Save the order

        await order.save();

        // Update item quantities
        for (let i = 0; i < order.items.length; i++) {
            const item = await ItemModel.findOne({ _id: order.items[i].item_id });
            item.qty = item.qty - order.items[i].item_qty;
            await item.save();
        }

        // Commit the transaction
        await session.commitTransaction();
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        await session.abortTransaction();
        console.log('Error in placing the order:', error.message);
        res.status(500).json({ error: error.message });
    } finally {
        await session.endSession();
    }
});

module.exports = router;