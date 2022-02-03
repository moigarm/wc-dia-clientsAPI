const mongoose = require("mongoose");

var wooClient = new mongoose.Schema({
  id: {
    type: String
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  primary_address_street: {
    type: String
  },
  primary_address_city: {
    type: String
  },
  primary_address_state: {
    type: String
  },
  primary_address_postalcode: {
    type: String
  },
  primary_address_country: {
    type: String
  },
  email1: {
    type: String,
    required: true,
  },
  phone_mobile: {
    type: String,
    required: true,
  }
});

mongoose.model("wooClient", wooClient);
