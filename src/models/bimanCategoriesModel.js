const mongoose = require("mongoose");

let bimanCategories = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("bimanCategories", bimanCategories);
