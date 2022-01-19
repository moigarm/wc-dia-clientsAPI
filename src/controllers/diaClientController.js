const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const diaClient = mongoose.model('wooClient')

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res)
        else
        updateRecord(req, res)
});


function insertRecord(req, res) {
    var client = new diaClient()
    client.nombreCliente = req.body.clientName
    client.correo = req.body.email
    client.telefono = req.body.phoneNumber
    client.temasDeInteres = req.body.topicsOfInteres
    client.save((err, doc) => {
        if (!err)
            res.end(`Inserción satisfactoria`)
        else
            res.end(`Error durante inserción : ' + ${err}`)
    });
}

function updateRecord(req, res) {
    diaClient.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)
            res.end(`Actualización satisfactoria`)
        else
            res.end(`Error durante actualización : ' + ${err}`)
    });
}


router.get('/list', (req, res) => {
    diaClient.find((err, docs) => {
        if (err)
        res.end(`Error durante la recuperación de datos : ' + ${err}`)
        res.send(docs)
    });
});

router.get('/:id', (req, res) => {
    diaClient.findById(req.params.id, (err, doc) => {
        if (err)
        res.end(`No se encontró el registro : ' + ${err}`)
        res.send(doc)
    });
});

router.get('/delete/:id', (req, res) => {
    diaClient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err)
        res.end(`No se encontró el registro para eliminar : ' + ${err}`)
        else res.end(`Registro ${req.params.id} ha sido eliminado satisfactoriamente`)
    });
});

module.exports = router;