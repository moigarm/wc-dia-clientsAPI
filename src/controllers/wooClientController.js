const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const wooClient = mongoose.model('wooClient')

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res)
        else
        updateRecord(req, res)
});


function insertRecord(req, res) {
    var client = new wooClient()
    client.nombreCliente = req.body.clientName
    client.productosComprados = req.body.products
    client.valorCompra = req.body.amount
    client.fechaCompra = req.body.date
    client.save((err, doc) => {
        if (!err)
            res.end(`Inserción satisfactoria`)
        else
            res.end(`Error durante inserción : ' + ${err}`)
    });
}

function updateRecord(req, res) {
    wooClient.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)
            res.end(`Actualización satisfactoria`)
        else
            res.end(`Error durante actualización : ' + ${err}`)
    });
}


router.get('/list', (req, res) => {
    wooClient.find((err, docs) => {
        if (!err)
        res.end(`Error durante la recuperación de datos : ' + ${err}`)
    });
});

router.get('/:id', (req, res) => {
    wooClient.findById(req.params.id, (err, doc) => {
        if (err)
        res.end(`No se encontró el registro : ' + ${err}`)
    });
});

router.get('/delete/:id', (req, res) => {
    wooClient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err)
        res.end(`No se encontró el registro para eliminar : ' + ${err}`)
    });
});

module.exports = router;