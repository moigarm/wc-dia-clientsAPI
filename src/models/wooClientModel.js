const mongoose = require("mongoose")

var wooClient = new mongoose.Schema({
  id: {
    type: Number
  },
  email: {
    type: String
  },
  PrimerNombre: {
    type: String
  },
  PrimerApellido: {
    type: String
  },
  username: {
    type: String
  },
  NumeroCelular: {
    type: String
  }
})

mongoose.model("wooClient", wooClient)
