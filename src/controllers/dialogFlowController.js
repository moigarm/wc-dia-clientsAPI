const express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body.queryResult);
  res.json(req.body);
});

module.exports = router;
