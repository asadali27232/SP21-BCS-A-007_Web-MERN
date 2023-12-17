const express = require('express');
let router = express.Router();

router.get('/home', function (req, res) {
    res.render('home', { req: req });
});

router.get('/orders', function (req, res) {
    res.render('orders', { req: req });
});

module.exports = router;
