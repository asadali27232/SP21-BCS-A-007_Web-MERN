const express = require('express');
let router = express.Router();

router.get('/products', function (req, res) {
    res.render('products', { req: req });
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard', { req: req });
});

module.exports = router;
