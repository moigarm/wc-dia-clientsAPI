const express = require('express')
var router = express.Router()

router.post('/', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

module.exports = router;