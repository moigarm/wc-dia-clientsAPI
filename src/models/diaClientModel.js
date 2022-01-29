const mongoose = require("mongoose");

var diaClient = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  phoneNumbers: [
    {
      e164PhoneNumber: {
        type: String
      },
      extension: {
        type: String
      },
      preferredDomesticCarrierCode: {
        type: String
      }
    }
  ],
  habilitado: {
    type: Boolean,
  },
});

mongoose.model("diaClient", diaClient);
