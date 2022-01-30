const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const wooClient = mongoose.model("wooClient");
const { wooClientMap } = require("../util/wooClientMapper");

router.post("/", (req, res) => {
  insertRecord(req, res);
});

router.put("/update", (req, res) => {
  updateRecord(req, res);
});

function insertRecord(req, res) {
  try {
    
    let client = wooClientMap(req.body);
    client.save((err, doc) => {
    if (!err) res.json({ status: 200, message: `Inserción satisfactoria` });
    else res.json({ status: 404, message: `Error en Inserción : ' + ${err}` });
    });
  } catch (error) {
    console.log(error)
  }
}

function updateRecord(req, res) {
  try {
    
    wooClient.findOneAndUpdate(
      { id: req.params.id },
      wooClientMap(req.body),
      (err, doc) => {
        if (!err)
        res.json({ status: 200, message: `Actualización satisfactoria` });
        else
        res.json({
          status: 404,
          message: `No se actualizó el registro : ' + ${err}`,
        });
      }
      );
    } catch (error) {
      console.log(error)
    }
}

router.get("/list", (req, res) => {
  try {
    
    wooClient.find((err, docs) => {
      if (err)
      res.json({
        status: 404,
        message: `Error durante la recuperación de datos : ' + ${err}`,
      });
      res.json({ status: 200, objects: docs });
    });
  } catch (error) {
    console.log(error)
  }
});

router.get("/:id", (req, res) => {
  try {
    
    wooClient.find({ id: req.params.id }, (err, doc) => {
      if (err)
      res.json({
        status: 404,
        message: `No se encontró el registro : ' + ${err}`,
      });
      res.json({ status: 200, object: doc });
    });
  } catch (error) {
    console.log(error)
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    
    wooClient.findOneAndUpdate(
      { id: req.params.id },
      wooClientMap(req.body, false),
      (err, doc) => {
        if (!err) res.json({ status: 200, message: `Eliminación satisfactoria` });
        else
        res.json({
          status: 404,
          message: `No se eliminó el registro : ' + ${err}`,
        });
      }
      );
    } catch (error) {
      console.log(error)
    }
});

module.exports = router;
