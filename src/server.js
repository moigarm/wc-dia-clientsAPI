require('dotenv').config()
require('./models/db')

const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')

const diaClientController = require('./controllers/diaClientController')
const wooClientController = require('./controllers/wooClientController')
const wooProductoController = require('./controllers/wooProductoController')

let allowedOrigins = ['']

var app = express()
app.use(cors({
    origin: function(origin, callback){
        // permite requests sin origen como los curl requests
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
          let msg = 'La política CORS para esta API, no permite el acceso ' +
                    'desde este origen especificado.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
}))

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json())

app.listen(process.env.PORT, () => {
    console.log('Servidor Express inció en puerto : 3000')
});

app.use('/diaClient', diaClientController)
app.use('/wooClient', wooClientController)
app.use('/wooPrducto', wooProductoController)