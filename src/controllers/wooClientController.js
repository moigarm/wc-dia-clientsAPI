const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const wooClient = mongoose.model('wooClient')

router.post('/', (req, res) => {
    insertRecord(req, res)
})

router.put('/update', (req, res) => {
    updateRecord(req, res)
})

function insertRecord(req, res) {
    var client = new wooClient()
    client.nombreCliente = req.body.clientName
    client.productosComprados = req.body.products
    client.valorCompra = req.body.amount
    client.fechaCompra = req.body.date
    // El cliente está habilitado por defecto
    client.habilitado = true
    client.save((err, doc) => {
        if (!err)
            res.json({status: 200, message: `Inserción satisfactoria`})
        else
        res.json({status: 404, message: `Error en Inserción : ' + ${err}`})
    })
}

function updateRecord(req, res) {
    wooClient.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Actualización satisfactoria`})
        else
        res.json({status: 404, message: `No se actualizó el registro : ' + ${err}`})
    })
}


router.get('/list', (req, res) => {
    wooClient.find((err, docs) => {
        if (err)
        res.json({status: 404, message: `Error durante la recuperación de datos : ' + ${err}`})
        res.json({status: 200, objects: docs})
    })
})

router.get('/:id', (req, res) => {
    wooClient.findById(req.params.id, (err, doc) => {
        if (err)
        res.json({status: 404, message: `No se encontró el registro : ' + ${err}`})
        res.json({status: 200, object: doc})
    })
})

router.delete('/delete/:id', (req, res) => {
    req.body.habilitado = false
    wooClient.findOneAndUpdate({ _id: req.body._id }, req.body, (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Eliminación satisfactoria`})
        else
        res.json({status: 404, message: `No se eliminó el registro : ' + ${err}`})
    })
})

module.exports = router;