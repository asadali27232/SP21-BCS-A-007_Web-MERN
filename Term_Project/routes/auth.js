const express = require('express');
let router = express.Router();
const loginFormValidator = require('../middlewares/loginFormValidator');
const registerFormValidator = require('../middlewares/registerFormValidator');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', loginFormValidator, function (req, res) {
    res.send({
        message: `Login successful! Email: ${req.body.email} Password: ${req.body.password}`,
    });
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', registerFormValidator, function (req, res) {
    res.send({
        message: `Registration successful!\n Name: ${req.body.name} Email: ${req.body.email} Password: ${req.body.password}`,
    });
});

module.exports = router;
