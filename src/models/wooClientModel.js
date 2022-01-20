const mongoose = require('mongoose')

var wooClient = new mongoose.Schema({
    nombreCliente: {
        type: String
    },
    productosComprados: {
        type: [Object]
    },
    valorCompra: {
        type: mongoose.Decimal128
    },
    fechaCompra: {
        type: Date
    },
    habilitado: {
        type: Boolean
    }
});

mongoose.model('wooClient', wooClient)