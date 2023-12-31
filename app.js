const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const configRoutes = require('./routes');
const initializeApp  = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
configRoutes(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
