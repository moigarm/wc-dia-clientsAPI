const express = require("express");
var router = express.Router();
const { setCategories } = require("../util/WooCommerceAPI")

router.post("/", (req, res) => {
  console.log(req.body.queryResult.parameters.Nombre);
  res.json(req.body);
});

router.post("/categories", (req, res) => {
    setCategories(req.body)
})

module.exports = router;
