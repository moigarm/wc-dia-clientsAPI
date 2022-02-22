const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");
const bimanProducto = mongoose.model("BimanProducto");
const categoriesModel = mongoose.model("categories");
const bimanCategoriesModel = mongoose.model("bimanCategories");

const { filterObject, ObjCompare } = require("../util/utils");
const wooProducto = mongoose.model("wooProducto");
const categoriesMod = require("../models/categoriesModel");
const {
  wooProductoMap,
  bimanProductoToWooBatch,
  newbimanProductoToWoo,
} = require("../util/wooProductoMapper");
const {
  crearWooProducto,
  actualizarWooProducto,
  getWooStatus,
  WooProductoBatch2,
  setCategoriesBatch,
  createCategory
} = require("../util/WooCommerceAPI");
const { comesFromBiman_Woo } = require("../util/locations");
const fetch = require("node-fetch");
const getCoolecheraProducts = require("../util/getCoolecheraProducts");
const generateSchema = require("generate-schema");

// BIMAN_C para Biman Create, BIMAN_U para Biman Update
let bimanCreateProduct = process.env.BIMAN_BASE + process.env.BIMAN_C_PRODUCT;
let bimanUpdateProduct = process.env.BIMAN_BASE + process.env.BIMAN_U_PRODUCT;
let bimanProductos = process.env.BIMAN_PRODUCTOS;
//#region insert/update

/**
 * @swagger
 *  /wooProducto:
 *    post:
 *      description: Crea un producto en WooCommerce
 *    parameters:
 *      - name: bimanProducto
 *        in: body
 *        description: Producto proveniente de API biman
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            nombreAlmacen:
 *              type: string
 *            ID:
 *              type: number
 *            CodigoSap:
 *              type: string
 *            NombreComercial:
 *              type: string
 *            nomGenerico:
 *              type: string
 *            VentaUnitaria:
 *              type: number
 *            tasaIva:
 *              type: number
 *            existencia:
 *              type: number
 *            nomTipo:
 *              type: string
 *            Idservicio:
 *              type: number
 *            tasaDescuento:
 *              type: number
 *            Cantidad:
 *              type: number
 *    responses:
 *      '201':
 *        description: Producto creado en WooCommerce
 */
router.post("/", (req, res) => {
  console.log(req.body);
  insertRecord(req, res);
});

/**
 * @swagger
 *  /wooProducto/update:
 *    put:
 *      description: Actualiza un producto en WooCommerce, requiere del objeto que se guarda en el API biman
 *      summary: Actualiza un producto en WooCommerce
 *    parameters:
 *      - name: bimanProducto
 *        in: body
 *        description: Producto proveniente de API biman
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            nombreAlmacen:
 *              type: string
 *            ID:
 *              type: number
 *            CodigoSap:
 *              type: string
 *            NombreComercial:
 *              type: string
 *            nomGenerico:
 *              type: string
 *            VentaUnitaria:
 *              type: number
 *            tasaIva:
 *              type: number
 *            existencia:
 *              type: number
 *            nomTipo:
 *              type: string
 *            Idservicio:
 *              type: number
 *            tasaDescuento:
 *              type: number
 *            Cantidad:
 *              type: number
 *    responses:
 *      '200':
 *        description: Producto actualizado en WooCommerce
 */
router.put("/update", (req, res) => {
  updateRecord(req, res);
});
//#endregion

// DELETE LOGIC WHEN OBJECT COMES FROM BIMAN
async function insertRecord(req, res) {
  console.log(req.body);
  try {
    // Traer categorías en MongoDB que se actualiza con Biman
    const bimanCategories = await bimanCategoriesModel.find(
      {},
      { _id: 0, __v: 0 }
      );
    // Guardar categoría actual del objeto a insertar
    let newCategory = false
    const actualCategory = req.body?.nomTipo
    console(actualCategory)
    const match = bimanCategories.filter(o => o.name === actualCategory)
    // Si la categoría del objeto a insertar es nueva, cambiamos el valor del flag
    if(match !== undefined) newCategory = true
    
    // Guardar categoría en MongoDB
    if(newCategory){
      let category = new bimanCategoriesModel({name: actualCategory})
      category.save(async (err, doc) =>{
        if(err)console.log(err)
        else console.log(doc)
      })
      // Guardar categoría en WooCommerce, guardar respuesta en MongoDB
      let categoryResponse = await createCategory(actualCategory)
      // Guardar producto en MongoDB
      //categoriesModel
    }

    
    
    // Buscar id de categoría para componer objeto proveniente de Biman
    
    
    // Convertir objeto proveniente de Biman con el id de Categoría de WooCommerce 
    
    
    // Guardar producto en WooCommerce, guardar respuesta de WooCommerce


    let producto2 = newbimanProductoToWoo(responseFromService);

    producto2.save((err, doc) => {
      if (!err) {
        res.json({ status: 201, message: doc });
      } else
        res.json({ status: 404, message: `Error en Inserción : ' + ${err}` });
    });
  } catch (error) {
    console.log(error);
  }
}

// DELETE LOGIC WHEN OBJECT COMES FROM BIMAN
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

router.get("/:sku", (req, res) => {
  try {
    wooProducto.find({ sku: req.params.sku }, (err, doc) => {
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
