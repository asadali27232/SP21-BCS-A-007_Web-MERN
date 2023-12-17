const express = require('express');
let router = express.Router();
let Product = require('../../models/product');

router.post('/getProduct', async function (req, res) {
    let productId = req.body._id;

    // Get product from database
    let product = await Product.findOne({ _id: productId });
    if (!product) {
        return res.status(404).json({
            error: 'Product not found!',
        });
    } else {
        return res.send({ product: product });
    }
});

router.post('/addProduct', async function (req, res) {
    // Get form data
    const name = req.body.name;
    const price = req.body.price;

    let lastProduct;
    let lastProductId;

    // Get last added product from database
    try {
        lastProduct = await Product.findOne().sort({ _id: -1 }).limit(1);
    } catch (error) {
        return;
    }

    lastProductId = lastProduct.id.toString().slice(-4);
    lastProductId = parseInt(lastProductId);

    // Save product to database
    try {
        const product = new Product({
            id: 'PRD' + (lastProductId + 1),
            name: name,
            price: price,
        });
        await product.save();
        return res.json({
            message: 'Product added successfully!',
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error saving product!',
        });
    }
});

router.post('/updateProduct', async function (req, res) {
    // Get form data
    const _id = req.body._id;
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;

    // Update product in database
    try {
        await Product.updateOne(
            { _id: _id },
            {
                $set: {
                    id: id,
                    name: name,
                    price: price,
                },
            }
        );
        return res.json({
            message: 'Product edited successfully!',
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error in edeting product!',
        });
    }
});

module.exports = router;
