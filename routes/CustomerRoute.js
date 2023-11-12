const router = require('express').Router();
const bodyParser = require('body-parser');
require('dotenv').config();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//Model
const CustomerModel = require('../public/model/CustomerModel');

//DB Connection
const mongoose = require('../db/DB');


router.get('/customers',async function (req, res) {
    console.log("Get Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const customers = await CustomerModel.find();
        await session.commitTransaction();
        if (customers){
            res.status(200).json(customers);
            console.log("Customers Sent");
        }else {
            res.status(404).json("No customers found");
            console.log("No customers found");
        }
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        res.status(500).json(error.code);
    } finally {
        await session.endSession();
    }

});
router.post('/customers',async function (req, res) {
    console.log("Save Customer Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const customer = new CustomerModel({
            _id: req.body.id,
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary,
            orders: []
        });
        const result = await customer.save();
        await session.commitTransaction();
        if (result){
            res.status(200).json(result);
            console.log("Customer Saved");
        }else {
            res.status(404).json("Error in saving the customer");
            console.log("Error in saving the customer");
        }
    } catch (error) {
        console.error("Transaction aborted due to an unexpected error: ${error}");
        await session.abortTransaction();
        res.status(500).json(error.code);
    } finally {
        await session.endSession();
    }
});
router.put('/customers/:Id',async function (req, res) {
    console.log("Update Customer Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const customer = await CustomerModel.findByIdAndUpdate(req.params.Id, {
            $set: {
                name: req.body.name,
                address: req.body.address,
                salary: req.body.salary
            }
        }, {new: true});
        await session.commitTransaction();
        if (customer){
            res.status(200).json(customer);
            console.log("Customer Updated");
        }else {
            res.status(404).json("Error in updating the customer");
            console.log("Customer Not Found");
        }
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        res.status(500).json(error.code);
        console.log("Error in updating the customer");
    } finally {
        await session.endSession();
    }
});
router.delete('/customers/:Id',async function (req, res) {
    console.log("Delete Customer Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const customer = await CustomerModel.findByIdAndDelete(req.params.Id);
        console.log("Customer Deleted: "+req.params.Id);
        await session.commitTransaction();
        if (customer){
            res.status(200).json(customer);
            console.log("Customer Deleted");
        }else {
            res.status(404).json("Error in deleting the customer");
            console.log("Customer Not Found");
        }
    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        res.status(500).json(error.code);
        console.log("Error in deleting the customer");
    }finally {
        await session.endSession();
    }
});
router.get('/customers/:Id',async function (req, res) {
    console.log("Get Customer Request Received");
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
        const customer = await CustomerModel.findById(req.params.Id);
        await session.commitTransaction();
        if (customer){
            res.status(200).json(customer);
            console.log("Customer Sent");
        }else {
            res.status(404);
            console.log("Customer Not Found");
        }
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json(error.code);
        console.log("Error in getting the customer");
    }finally {
        await session.endSession();
    }
});

module.exports = router;