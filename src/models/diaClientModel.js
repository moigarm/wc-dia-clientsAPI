const mongoose = require('mongoose');

var diaClient = new mongoose.Schema({
    nombreCliente: {
        type: String
    },
    correo: {
        type: String
    },
    telefono: {
        type: String
    },
    temasDeInteres: {
        type: [String]
    }
});

mongoose.model('diaEmail', diaClient);