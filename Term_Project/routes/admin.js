const express = require('express');
let router = express.Router();
const registerFormValidator = require('../middlewares/registerFormValidator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Product = require('../models/product');

router.get('/products', async function (req, res) {
    let products = [];
    try {
        products = await Product.find({});
        return res.render('products', { req: req, products: products });
    } catch (err) {
        console.log('Error in fetching products from database:', err.message);
        return;
    }
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard', { req: req });
});

router.get('/register', function (req, res) {
    res.render('register', { req: req });
});

router.post('/register', registerFormValidator, async function (req, res) {
    let user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user
        .save()
        .then(() => {
            return res.send({
                message: `Registration successful!\nName: ${req.body.name}\nEmail: ${req.body.email}\nRole: ${req.body.role}\nPassword: ${req.body.password}`,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                error: 'Email already exists!',
            });
        });
});

module.exports = router;
