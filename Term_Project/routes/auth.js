const express = require('express');
let router = express.Router();
const loginFormValidator = require('../middlewares/loginFormValidator');
const registerFormValidator = require('../middlewares/registerFormValidator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', loginFormValidator, async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    let valid = await bcrypt.compare(req.body.password, user.password);

    if (!user) {
        req.session.flash = { type: 'danger', message: 'No User Found' };
        return res.redirect('/register');
    } else if (!valid) {
        req.session.flash = { type: 'danger', message: 'Unable to Login' };
        return res.redirect('/login');
    }

    req.session.user = user;
    req.session.flash = {
        type: 'success',
        message: 'Logged In Successfully',
    };

    console.log(req.session.user);

    res.send({
        message: `Login successful! Email: ${req.body.email} Password: ${req.body.password}`,
    });
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', registerFormValidator, async function (req, res) {
    let user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user
        .save()
        .then(() => {
            res.send({
                message: `Registration successful!\nName: ${req.body.name}\nEmail: ${req.body.email}\nPassword: ${req.body.password}\nRole: ${req.body.role}`,
            });
            res.redirect('/login');
        })
        .catch((err) => {
            res.send({
                message: `Registration failed!\n${err.message}`,
            });
        });
});

module.exports = router;
