const express = require('express');
let router = express.Router();

router.get('/products', function (req, res) {
    res.render('products', { req: req });
});

// Adding more admin routes here

module.exports = router;
