const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

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
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.render('home');
});

app.use('/', require('./routes/admin'));
app.use('/', require('./routes/auth'));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
