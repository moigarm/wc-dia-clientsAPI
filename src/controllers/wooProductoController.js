const express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");
const bimanProducto = mongoose.model("BimanProducto");
const categoriesModel = mongoose.model("categories");
const bimanCategoriesModel = mongoose.model("bimanCategories");

const { filterObject, ObjCompare } = require("../util/utils");
const categoriesMod = require("../models/categoriesModel");
const {
  wooProductoMap,
  bimanProductoToWooNoId,
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
    //#region Category
    // Traer categor??as en MongoDB que se actualiza con Biman
    const bimanCategories = await bimanCategoriesModel.find(
      {},
      { _id: 0, __v: 0 }
      );
    // Guardar categor??a actual del objeto a insertar
    let newCategory = false
    const actualCategory = req.body?.nomTipo
    console(actualCategory)
    const match = bimanCategories.filter(o => o.name === actualCategory)
    // Si la categor??a del objeto a insertar es nueva, cambiamos el valor del flag
    if(match !== undefined) newCategory = true
    
    // Guardar categor??a en MongoDB
    if(newCategory){
      let category = new bimanCategoriesModel({name: actualCategory})
      category.save(async (err, doc) =>{
        if(err)console.log(err)
        else console.log(doc)
      })
      // Guardar categor??a en WooCommerce, guardar respuesta en MongoDB
      let categoryResponse = await createCategory(actualCategory)
      // Guardar producto en MongoDB
      let WooProductCategory = new categoriesModel(categoryResponse)
      WooProductCategory.save(async (err, doc) =>{
        if(err)console.log(err)
        else console.log(doc)
      })
    }
    //#endregion

    //Guardar producto de biman en MongoDB (tal como viene del API)
    let bimanProduct = new bimanProducto(req.body)
    bimanProduct.save(async (err, doc) =>{
      if(err)console.log(err)
      else console.log(doc)
    })

    // Buscar id de categor??a para componer objeto proveniente de Biman
    const categoryWooProducto = await categoriesModel.find({name: actualCategory})
    
    // Convertir objeto proveniente de Biman con el id de Categor??a de WooCommerce 
    const bimanProducto1 = bimanProductoToWooNoId(req.body)
    bimanProducto1.categories = {id: categoryWooProducto.id}
    
    // Guardar producto en WooCommerce, guardar respuesta de WooCommerce
    let WooProductoResponse = await crearWooProducto(bimanProducto1)
    let productoFinal = new wooProducto(WooProductoResponse)
    productoFinal.findOneAndUpdate((err, doc) => {
      if (!err) {
        res.json({ status: 201, message: doc });
      } else
        res.json({ status: 404, message: `Error en Inserci??n : ' + ${err}` });
    });
  } catch (error) {
    console.log(error);
  }
}

// DELETE LOGIC WHEN OBJECT COMES FROM BIMAN
async function updateRecord(req, res) {
  try {
    //#region Category
    // Traer categor??as en MongoDB que se actualiza con Biman
    const bimanCategories = await bimanCategoriesModel.find(
      {},
      { _id: 0, __v: 0 }
      );
    // Guardar categor??a actual del objeto a insertar
    let newCategory = false
    const actualCategory = req.body?.nomTipo
    console(actualCategory)
    const match = bimanCategories.filter(o => o.name === actualCategory)
    // Si la categor??a del objeto a insertar es nueva, cambiamos el valor del flag
    if(match !== undefined) newCategory = true
    
    // Guardar categor??a en MongoDB
    if(newCategory){
      let category = new bimanCategoriesModel({name: actualCategory})
      category.save(async (err, doc) =>{
        if(err)console.log(err)
        else console.log(doc)
      })
      // Guardar categor??a en WooCommerce, guardar respuesta en MongoDB
      let categoryResponse = await createCategory(actualCategory)
      // Guardar producto en MongoDB
      let WooProductCategory = new categoriesModel(categoryResponse)
      WooProductCategory.save(async (err, doc) =>{
        if(err)console.log(err)
        else console.log(doc)
      })
    }
    //#endregion

    //Guardar producto de biman en MongoDB (tal como viene del API)
    let bimanProduct = new bimanProducto(req.body)
    bimanProducto.findOneAndUpdate(
      { id: bimanProduct.internal_id },
      bimanProduct,
      {new: true},
      (err, doc)=>{
      if(err)console.log(err)
      else console.log(doc)
    })

    // Buscar id de categor??a para componer objeto proveniente de Biman
    const categoryWooProducto = await categoriesModel.find({name: actualCategory})
    
    // Convertir objeto proveniente de Biman con el id de Categor??a de WooCommerce 
    const bimanProducto1 = bimanProductoToWooNoId(req.body)
    bimanProducto1.categories = {id: categoryWooProducto.id}
    const previousProducto = await wooProducto.find({sku: bimanProducto1.sku})
    
    // Guardar producto en WooCommerce, guardar respuesta de WooCommerce
    let WooProductoResponse = await actualizarWooProducto(previousProducto.id, bimanProducto1)
    let productoFinal = new wooProducto(WooProductoResponse)
    wooProducto.findOneAndUpdate(
      { id: productoFinal.id },
      productoFinal,
      {new: true},
      (err, doc) => {
      if (!err) {
        res.json({ status: 201, message: doc });
      } else
        res.json({ status: 404, message: `Error en actualizaci??n : ' + ${err}` });
    });
  } catch (error) {
    console.log(error)
  }
}


/**
 * @swagger
 *  /wooProducto/list:
 *    get:
 *      description: Lista los productos que se encuentran en la base de datos local que est?? actualizada con WooCommerce
 *    responses:
 *      '200':
 *        description: Lista enviada
 *        content: 
 *          application/json:
 *            scheme:
 *              type: array
 *              properties:
 *                id:
 *                type: integer
 */
router.get("/list", (req, res) => {
  try {
    wooProducto.find({},(err, docs) => {
      if (err){
        res.json({
          status: 404,
          message: `Error durante la recuperaci??n de datos : ' + ${err}`,
        });
      }else{
        console.log(docs[0])
      res.json({ status: 200, objects: docs });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:internalid", (req, res) => {
  try {
    wooProducto.find({ sku: req.params.internalid }, (err, doc) => {
      if (err)
        res.json({
          status: 404,
          message: `No se encontr?? el registro : ' + ${err}`,
        });
      res.json({ status: 200, object: doc });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/delete/:internalid", (req, res) => {
  try {
    req.body.habilitado = false;
    wooProducto.findOneAndUpdate(
      { sku: req.params.internalid },
      wooProductoMap(req.body, false),
      (err, doc) => {
        if (!err)
          res.json({ status: 200, message: `Eliminaci??n satisfactoria` });
        else
          res.json({
            status: 404,
            message: `No se elimin?? el registro : ' + ${err}`,
          });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
