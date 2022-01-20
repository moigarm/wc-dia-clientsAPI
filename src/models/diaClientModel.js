const mongoose = require("mongoose");

var diaClient = new mongoose.Schema({
  nombreCliente: {
    type: String,
  },
  correo: {
    type: String,
  },
  telefono: {
    type: String,
  },
  temasDeInteres: {
    type: [String],
  },
  habilitado: {
    type: Boolean,
  },
});

mongoose.model("diaClient", diaClient);
