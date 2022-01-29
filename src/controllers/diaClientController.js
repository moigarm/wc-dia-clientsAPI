const express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const diaClient = mongoose.model('diaClient')
const { diaClientMap } = require("../util/diaClientMapper");
// BIMAN_C para Biman Create, BIMAN_U para Biman Update
let bimanCreateProduct = process.env.BIMAN_BASE + process.env.BIMAN_C_PRODUCT
let bimanUpdateProduct = process.env.BIMAN_BASE + process.env.BIMAN_U_PRODUCT

router.post('/', (req, res) => {
    insertRecord(req, res)
})

router.put('/update', (req, res) => {
    updateRecord(req, res)
})

function insertRecord(req, res) {
    try {
    let client = diaClientMap(req.body)
    client.save((err, doc) => {
        if (!err){
            fetch(bimanCreateProduct, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(doc)
            }).then((response)=>{
                let data = response.data
                console.log(data)
            });
        }
        else
        res.json({status: 404, message: `Error en Inserción : ' + ${err}`})
    })           
    } catch (error) {
        console.log(error) 
    }
}

function updateRecord(req, res) {
    try{
    diaClient.findOneAndUpdate({ id: req.body.id }, diaClientMap(req.body), { new: true }, (err, doc) => {
        if (!err){
            fetch(bimanCreateProduct, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(doc)
                }).then((response)=>{
                    let data = response.data
                    console.log(data)
                }).catch((err)=>{
                    console.log(err)
                });
        }
        else
        res.json({status: 404, message: `No se actualizó el registro : ' + ${err}`})
    })       
    } catch (error) {
        console.log(error)       
    }
}


router.get('/list', (req, res) => {
    try {
        diaClient.find((err, docs) => {
            if (err)
            res.json({status: 404, message: `Error durante la recuperación de datos : ' + ${err}`})
            res.json({status: 200, objects: docs})
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', (req, res) => {
    try {
        diaClient.find({ id: req.params.id }, (err, doc) => {
            if (err)
            res.json({status: 404, message: `No se encontró el registro : ' + ${err}`})
            res.json({status: 200, object: doc})
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/delete/:id', (req, res) => {
    try {
        req.body.habilitado = false
        diaClient.findOneAndUpdate({ id: req.params.id }, diaClientMap(req.body), (err, doc) => {
            if (!err)
            res.json({status: 200, message: `Eliminación satisfactoria`})
            else
            res.json({status: 404, message: `No se eliminó el registro : ' + ${err}`})
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;