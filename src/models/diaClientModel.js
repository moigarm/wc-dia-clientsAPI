const mongoose = require("mongoose");

var diaClient = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
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
