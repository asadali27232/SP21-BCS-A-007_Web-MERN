const express = require('express');
const Product = require('../models/product');
let router = express.Router();

router.get('/home', async function (req, res) {
    let products = [];
    try {
        products = await Product.find({});
        return res.render('home', { req: req, products: products });
    } catch (err) {
        console.log('Error in fetching products from database:', err.message);
        return res.render('home', {
            req: req,
            products: [
                { id: 'Error', name: 'Error from Database', price: 404 },
            ],
        });
    }
});

router.get('/orders', function (req, res) {
    res.render('orders', { req: req });
});

module.exports = router;
