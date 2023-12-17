const express = require('express');
let router = express.Router();
const loginFormValidator = require('../middlewares/loginFormValidator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
    return res.render('login', { req: req });
});

router.post('/login', loginFormValidator, async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            req.session.flash = { type: 'danger', message: 'No User Found' };
            return res.status(500).send({
                error: 'User not found!',
            });
        }

        let valid = await bcrypt.compare(req.body.password, user.password);

        if (!valid) {
            req.session.flash = { type: 'danger', message: 'Unable to Login' };
            return res.status(500).send({
                error: 'Wrong password!',
            });
        }

        req.session.user = user;
        req.session.flash = {
            type: 'success',
            message: 'Logged In Successfully',
        };

        return res.send({
            message: `Login successful!\nName: ${user.name}\nRole: ${user.role}`,
        });
    } catch (err) {
        req.session.flash = {
            type: 'danger',
            message: 'Internal Server Error',
        };
        return res.status(500).send({
            error: 'Authentication failed!',
        });
    }
});

router.post('/logout', async function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.status(500).send({ error: 'Unable to log out!' });
        }
        return res.send({ message: 'Logged out successfully!' });
    });
});

module.exports = router;
