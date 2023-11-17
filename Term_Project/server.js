const express = require('express');
const server = express();
const expressLayouts = require('express-ejs-layouts');

server.use(express.static('public'));

server.set('view engine', 'ejs');
server.use(express.json());
server.use(express.urlencoded());

server.get('/', function (req, res) {
  res.render('home');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
