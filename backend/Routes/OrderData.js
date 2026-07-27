const express = require("express")
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
    // Create a new array copy using the spread operator to avoid mutating request data directly
    let data = [...req.body.order_data];
    
    // Add the order date safely at the beginning of the new array
    data.unshift({ Order_date: req.body.order_date });
    console.log("1231242343242354", req.body.email);

    // If email not existing in db then create: else: update with $push
    let eId = await Order.findOne({ 'email': req.body.email });    
    console.log(eId);
    
   if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true });
                });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ error: error.message });
        }
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: eId })
    } catch (error) {
        res.status(400).send("Error: " + error.message)
    }
});

module.exports = router;