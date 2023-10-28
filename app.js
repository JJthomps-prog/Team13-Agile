const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const routes = require('./routes'); // Require your routes file

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use your routes
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
