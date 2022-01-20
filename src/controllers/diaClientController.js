const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const diaClient = mongoose.model('diaClient')

router.post('/', (req, res) => {
    insertRecord(req, res)
})

router.put('/update', (req, res) => {
    updateRecord(req, res)
})

function insertRecord(req, res) {
    var client = new diaClient()
    client.nombreCliente = req.body.clientName
    client.correo = req.body.email
    client.telefono = req.body.phoneNumber
    client.temasDeInteres = req.body.topicsOfInteres
    client.save((err, doc) => {
        if (!err)
            res.json({status: 200, message: `Inserción satisfactoria`})
        else
        res.json({status: 404, message: `Error en Inserción : ' + ${err}`})
    })
}

function updateRecord(req, res) {
    diaClient.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Actualización satisfactoria`})
        else
        res.json({status: 404, message: `No se actualizó el registro : ' + ${err}`})
    })
}


router.get('/list', (req, res) => {
    diaClient.find((err, docs) => {
        if (err)
        res.json({status: 404, message: `Error durante la recuperación de datos : ' + ${err}`})
        res.json({status: 200, objects: docs})
    })
})

router.get('/:id', (req, res) => {
    diaClient.findById(req.params.id, (err, doc) => {
        if (err)
        res.json({status: 404, message: `No se encontró el registro : ' + ${err}`})
        res.json({status: 200, object: doc})
    })
})

router.get('/delete/:id', (req, res) => {
    diaClient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Eliminación satisfactoria`})
        else
        res.json({status: 404, message: `No se eliminó el registro : ' + ${err}`})
    })
})

module.exports = router;