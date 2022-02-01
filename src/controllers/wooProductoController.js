const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { filterObject, ObjCompare } = require("../util/utils");
const wooProducto = mongoose.model("wooProducto");
const { wooProductoMap, bimanProductoToWooBatch } = require("../util/wooProductoMapper");
const {
  crearWooProducto,
  actualizarWooProducto,
  getWooStatus,
  WooProductoBatch2
} = require("../util/WooCommerceAPI");
const { comesFromBiman_Woo } = require("../util/locations");
const fetch = require("node-fetch");

// BIMAN_C para Biman Create, BIMAN_U para Biman Update
let bimanCreateProduct = process.env.BIMAN_BASE + process.env.BIMAN_C_PRODUCT;
let bimanUpdateProduct = process.env.BIMAN_BASE + process.env.BIMAN_U_PRODUCT;
let bimanProductos = process.env.BIMAN_PRODUCTOS;

router.get("/status", (req, res)=>{
  res.json({status: 200, message: getWooStatus()})
})
router.post("/", (req, res) => {
  console.log(req.body);
  insertRecord(req, res);
});

router.put("/update", (req, res) => {
  updateRecord(req, res);
});

router.get("/batchme", (req, res) => {
  CrearProductoBatch(req, res);
});

async function insertRecord(req, res) {
  console.log(req.body)
  let noNew = false;
  try {
    let producto = wooProductoMap(req.body);
    let responseFromService = {};
    wooProducto.find({ id: req.body.id }, (err, doc) => {
      if (doc.id == req.body.id) noNew = true;
    });
    if (!noNew) {
      if (comesFromBiman_Woo(req.header("x-wc-webhook-source")) == "biman") {
        let response = fetch(bimanCreateProduct, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(producto),
        });
        let data = await response.data;
        console.log(data);
        responseFromService = producto;
      } else {
        console.log("Crear producto ps")
        responseFromService = await crearWooProducto(producto);
      }
      let producto2 = wooProductoMap(responseFromService);

      producto2.save((err, doc) => {
        if (!err) {
          res.json({ status: 200, message: doc });
        } else
          res.json({ status: 404, message: `Error en Inserción : ' + ${err}` });
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateRecord(req, res) {
  let recentlyUpdated = false;
  let responseFromService = {};
  let producto = wooProductoMap(req.body);
  try {
    // Elimina propiedades que no se desea guardar
    // (se tiene que agregar con ObjCompare en caso de no ser un arreglo vacío)
    //console.log(filterObject(req.body, ["permalink"]));
    wooProducto.find({ id: req.body.id }, (err, doc) => {
      // Último parámetro es para propiedades que no necesitan compararse
      // ejemplo: date_created, date_created_gmt, date_modified, date_modified_gmt
      // por que se quiere comparar si en realidad las propiedades fueron modificadas
      recentlyUpdated = ObjCompare(producto, doc, [
        "date_modified",
        "date_modified_gmt",
      ]);
      if (err) console.log(err);
    });

    // Si no se acaban de actualizar
    if (!recentlyUpdated) {
      if (comesFromBiman_Woo(req.header("x-wc-webhook-source")) == "biman") {
        let response = fetch(bimanUpdateProduct + "/" + id.req.body.id, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(producto),
        });
        let data = await response.data;
        responseFromService = data;
      } else {
        responseFromService = await actualizarWooProducto(
          producto.id,
          producto
        );
      }
      console.log("Response from the service is:");
      let producto2 = wooProductoMap(responseFromService);
      producto2._id = req.body._id;
      wooProducto.findOneAndUpdate(
        { _id: producto2._id },
        producto2,
        { new: true },
        (err, doc) => {
          if (!err) {
            console.log(doc);
            res.json({ status: 200, message: doc });
          } else {
            console.log(err);
            res.json({
              status: 404,
              message: `No se actualizó el registro : ' + ${err}`,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

async function CrearProductoBatch(req, res) {
  let responseFromService = {};
  try {
    let response = await fetch(bimanProductos, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    let data = await response.json();
    let productos = bimanProductoToWooBatch(data)
    responseFromService = await WooProductoBatch2(productos);
    let finalResult = []
    responseFromService.forEach((element, i) => {
      wooProducto.insertMany(element, (err, docs) => {
        if (!err) {
          finalResult[i] = docs
        } else {
          console.log(err);
          res.json({
            status: 404,
            message: `No se insertaron los registros de manera adecuada a MongoDB : ' + ${err}`,
          });
        }
      });
    });
    res.json({status:200, message: finalResult})
  } catch (error) {
    console.log("Error desconocido")
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
});

router.get("/delete/:id", (req, res) => {
  try {
    req.body.habilitado = false;
    wooProducto.findOneAndUpdate(
      { id: req.params.id },
      wooProductoMap(req.body, false),
      (err, doc) => {
        if (!err)
          res.json({ status: 200, message: `Eliminación satisfactoria` });
        else
          res.json({
            status: 404,
            message: `No se eliminó el registro : ' + ${err}`,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
