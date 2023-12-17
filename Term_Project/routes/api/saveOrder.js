const express = require('express');
let router = express.Router();
let Order = require('../../models/order');

router.post('/saveOrder', async function (req, res) {
    let order = new Order({
        invoice: req.body.order,
        user: req.session.user,
    });
    await order.save();
    return;
});

module.exports = router;
