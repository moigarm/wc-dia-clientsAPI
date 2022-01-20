const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const wooProducto = mongoose.model('wooProducto')

router.post('/', (req, res) => {
    insertRecord(req, res)
})

router.put('/update', (req, res) => {
    updateRecord(req, res)
})

function insertRecord(req, res) {
    var producto = new wooProducto()
    producto.nombre = req.body.productName
    producto.precio = req.body.price
    producto.descripcion = req.body.description
    producto.save((err, doc) => {
        if (!err)
            res.json({status: 200, message: `Inserción satisfactoria`})
        else
        res.json({status: 404, message: `Error en Inserción : ' + ${err}`})
    })
}

function updateRecord(req, res) {
    wooProducto.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Actualización satisfactoria`})
        else
        res.json({status: 404, message: `No se actualizó el registro : ' + ${err}`})
    })
}


router.get('/list', (req, res) => {
    wooProducto.find((err, docs) => {
        if (err)
        res.json({status: 404, message: `Error durante la recuperación de datos : ' + ${err}`})
        res.json({status: 200, objects: docs})
    })
})

router.get('/:id', (req, res) => {
    wooProducto.findById(req.params.id, (err, doc) => {
        if (err)
        res.json({status: 404, message: `No se encontró el registro : ' + ${err}`})
        res.json({status: 200, object: doc})
    })
})

router.get('/delete/:id', (req, res) => {
    wooProducto.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err)
        res.json({status: 200, message: `Eliminación satisfactoria`})
        else
        res.json({status: 404, message: `No se eliminó el registro : ' + ${err}`})
    })
})

module.exports = router;