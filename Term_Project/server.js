const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/products', function (req, res) {
    res.render('products');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
