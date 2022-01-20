const mongoose = require('mongoose')

var wooProducto = new mongoose.Schema({
    id: {
        type: String
    },
    nombre: {
        type: String
    },
    precio: {
        type: mongoose.Decimal128
    },
    descripcion: {
        type: String
    }
});

mongoose.model('wooProductoModel', wooProducto)