const router = require('express').Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//DB Connection
const mongoose = require('../db/DB');


//Model
const ItemModel = require('../public/model/ItemModel');

router.get('/items', async function (req, res) {
    console.log("Get Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const items = await ItemModel.find();
        await session.commitTransaction();
        if (items) {
            res.status(200).json(items);
            console.log("Items Sent");
        } else {
            res.status(404).json("Items Not Found");
            console.log("Items Not Found");
        }
    } catch (err) {
        await session.abortTransaction();
        console.log("Error in retrieving the items");
        res.status(500).json(err.code);
    } finally {
        await session.endSession();
    }
});
router.post('/items', async function (req, res) {
    console.log("Save Item Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const item = new ItemModel({
            _id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
        });
        const result = await item.save();
        await session.commitTransaction();
        if (result) {
            res.status(200).json(result);
            console.log("Item Saved");
        } else {
            res.status(404).json("Error in saving the item");
            console.log("Error in saving the item");
        }
    } catch (err) {
        await session.abortTransaction();
        console.log("Error in saving the item");
        res.status(500).json(err.code);
    } finally {
        await session.endSession();
    }
});
router.put('/items/:id', async function (req, res) {
    console.log("Update Item Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    console.log(req.params.id);
    try {
        const result = await ItemModel.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                price: req.body.price,
                qty: req.body.qty
            }
        }, {new: true});
        await session.commitTransaction();
        if (result) {
            res.status(200).json(result);
            console.log("Item Updated");
        } else {
            res.status(404).json("Item Not Found");
            console.log("Item Not Found");
        }
    } catch (err) {
        await session.abortTransaction();
        console.log("Error in updating the item");
        res.status(500).json(err.code);
    }
});
router.delete('/items/:id', async function (req, res) {
    console.log("Delete Item Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const result = await ItemModel.findByIdAndDelete(req.params.id);
        await session.commitTransaction();
        if (result) {
            res.status(200).json(result);
            console.log("Item Deleted");
        } else {
            res.status(404).json("Item Not Found");
            console.log("Item Not Found");
        }
    } catch (err) {
        await session.abortTransaction();
        console.log("Error in deleting the item");
        res.status(500).json(err.code);
    } finally {
        await session.endSession();
    }
});
router.get('/items/:id', async function (req, res) {
    console.log("Get Item Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const result = await ItemModel.findById(req.params.id);
        await session.commitTransaction();
        if (result) {
            res.status(200).json(result);
            console.log("Item Sent");
        } else {
            res.status(404).json("Item Not Found");
            console.log("Item Not Found");
        }
    } catch (err) {
        await session.abortTransaction();
        console.log("Error in retrieving the item");
        res.status(500).json(err.code);
    } finally {
        await session.endSession();
    }
});

module.exports = router;

