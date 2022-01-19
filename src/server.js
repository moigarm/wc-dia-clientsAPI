require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const diaClientController = require('./controllers/diaClientController');
const wooClientController = require('./controllers/wooClientController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.listen(3000, () => {
    console.log('Servidor Express inció en puerto : 3000');
});

app.use('/diaClient', diaClientController);
app.use('/wooClient', wooClientController);