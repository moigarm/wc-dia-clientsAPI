const mongoose = require("mongoose");

var categories = new mongoose.Schema({
  id: Number,
  name: String,
  slug: String,
  parent: Number,
  description: String,
  display: String,
  image: [{
    _id: false,
    id: Number,
    name: String,
    src: String
  }],
  menu_order: Number,
  count: Number,
  _links: {
    _id: false,
    self: [
      {
        href: String
      }
    ],
    collection: [
      {
        href: String
      }
    ],
    up: [
      {
        href: String
      }
    ]
  }
}
);

module.exports = mongoose.model("categories", categories);
