require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, (err) => {
    if (!err)
        console.log('Conexión a MongoDB exitosa.') 
    else console.log('Error en la conexión a la bd : ' + err)
})

require('./diaClientModel')
require('./wooClientModel')
require('./wooProductoModel')
require('./bimmanProductoModel')