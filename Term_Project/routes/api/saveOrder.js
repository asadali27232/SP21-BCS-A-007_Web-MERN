const express = require('express');
let router = express.Router();
let Order = require('../../models/order');

router.post('/saveOrder', async function (req, res) {
    let order = new Order({
        invoice: req.body.order,
        user: req.session.user,
    });
    await order.save();
    return res.send({ message: 'Order Saved Successfully!' });
});

router.get('/getOrders', async function (req, res) {
    let orders = await Order.find({ 'user._id': req.session.user._id });
    return res.send(orders);
});

module.exports = router;
