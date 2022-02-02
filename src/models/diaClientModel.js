const mongoose = require("mongoose");

var diaClient = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
  },
  habilitado: {
    type: Boolean,
  },
});

mongoose.model("diaClient", diaClient);
