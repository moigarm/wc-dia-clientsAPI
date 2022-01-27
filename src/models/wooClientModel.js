const mongoose = require("mongoose");

var wooClient = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  PrimerNombre: {
    type: String,
    required: true,
  },
  PrimerApellido: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  NumeroCelular: {
    type: String,
    required: true,
  },
});

mongoose.model("wooClient", wooClient);
