const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const wooClient = mongoose.model('wooClient')
import { wooClientMap } from "../util/wooClientMapper"

router.post('/', (req, res) => {
    insertRecord(req, res)
})

router.put('/update', (req, res) => {
    updateRecord(req, res)
})

function insertRecord(req, res) {
    let client = wooClientMap(req.body)
    client.save((err, doc) => {
        if (!err)
            res.json({status: 200, message: `Inserción satisfactoria`})
        else
        res.json({status: 404, message: `Error en Inserción : ' + ${err}`})
    })
}

function updateRecord(req, res) {
    wooClient.findOneAndUpdate({ id: req.params.id }, wooClientMap(req.body), (err, doc) => {
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
    wooClient.find({ id: req.params.id }, (err, doc) => {
        if (err)
        res.json({status: 404, message: `No se encontró el registro : ' + ${err}`})
        res.json({status: 200, object: doc})
    })
})

router.delete('/delete/:id', (req, res) => {
    wooClient.findOneAndUpdate({ id: req.params.id }, wooClientMap(req.body, false), (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Eliminación satisfactoria`})
        else
        res.json({status: 404, message: `No se eliminó el registro : ' + ${err}`})
    })
})

module.exports = router;