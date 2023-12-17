const express = require('express');
const Product = require('../models/product');
const Order = require('../models/order');
let router = express.Router();

router.get('/home', async function (req, res) {
    let products = [];
    try {
        products = await Product.find({});
        return res.render('home', { req: req, products: products });
    } catch (err) {
        console.log('Error in fetching products from database:', err.message);
        return;
    }
});

router.get('/orders', async function (req, res) {
    let orders = [];
    try {
        orders = await Order.find({});
        return res.render('orders', { req: req, orders: orders });
    } catch (err) {
        console.log('Error in fetching orders from database:', err.message);
        return;
    }
});

router.get('/orderDetails', async function (req, res) {
    let id = req.query.id;
    let order = {};
    try {
        order = await Order.findById(id);
        return res.render('orderDetails', { req: req, order: order });
    } catch (err) {
        console.log('Error in fetching order from database:', err.message);
        return;
    }
});

module.exports = router;
