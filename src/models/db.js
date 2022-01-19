const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Clients', (err) => {
    if (!err) { console.log('Conexión a MongoDB exitosa.') }
    else { console.log('Error en la conexión a la bd : ' + err) }
});

require('./diaClientModel');
require('./wooClientModel');