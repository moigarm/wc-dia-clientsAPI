const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { filterObject } = require("../util/utils");
const wooProducto = mongoose.model("wooProducto");
const { wooProductoMap } = require("../util/wooProductoMapper");

router.post("/", (req, res) => {
  console.log(req.body);
  insertRecord(req, res);
});

router.put("/update", (req, res) => {
  updateRecord(req, res);
});

function insertRecord(req, res) {
  try {
    
    let producto = wooProductoMap(req.body);
    producto.save((err, doc) => {
      if (!err) res.json({ status: 200, message: `Inserción satisfactoria` });
      else res.json({ status: 404, message: `Error en Inserción : ' + ${err}` });
    });
  } catch (error) {
    
  }
}

function updateRecord(req, res) {
  console.log(filterObject(req.body, ["permalink"]));
  
  try {
    wooProducto.findOneAndUpdate(
      { id: req.body.id },
      wooProductoMap(req.body),
      { new: true },
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
      
    }
}

router.get("/list", (req, res) => {
  try {
    
    wooProducto.find((err, docs) => {
      if (err)
      res.json({
        status: 404,
        message: `Error durante la recuperación de datos : ' + ${err}`,
      });
      res.json({ status: 200, objects: docs });
    });
  } catch (error) {
    
  }
});

router.get("/:id", (req, res) => {
  try {
    
    wooProducto.find({ id: req.params.id }, (err, doc) => {
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

router.get("/delete/:id", (req, res) => {
  try {
    
    req.body.habilitado = false;
    wooProducto.findOneAndUpdate(
      { id: req.params.id },
      wooProductoMap(req.body, false),
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
