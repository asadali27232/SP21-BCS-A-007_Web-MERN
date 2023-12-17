const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
var session = require('express-session');
const isLogin = require('./middlewares/loginAuth');
const isAdmin = require('./middlewares/adminAuth');

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/cakes-and-bakes', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err.message);
    });

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'My Open Secret!',
        resave: false,
        saveUninitialized: true,
    })
);

app.get('/', function (req, res) {
    return res.render('login', { req: req });
});

app.use('/', require('./routes/authentication'));

app.use('/', isLogin, require('./routes/user'));

app.use('/', isLogin, isAdmin, require('./routes/admin'));

app.use('/', isLogin, require('./routes/api/saveOrder'));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
