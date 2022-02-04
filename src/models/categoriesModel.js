const mongoose = require("mongoose");

var categories = new mongoose.Schema({
  idWoo: String,
  name: String,
});

module.exports = mongoose.model("categories", categories);
