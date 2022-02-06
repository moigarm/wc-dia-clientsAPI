require("dotenv").config();
require("./models/db");

const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");

const diaClientController = require("./controllers/diaClientController");
const wooClientController = require("./controllers/wooClientController");
const wooProductoController = require("./controllers/wooProductoController");

//Endpoint for testing purposes
const dialogFlowController = require("./controllers/dialogFlowController");

const { batchInicial } = require("./util/batchInicial");
const { WooProductoBatchCreate, actualizarWooProducto } = require("./util/WooCommerceAPI")

const getCoolecheraProducts = require("./util/getCoolecheraProducts");
var cron = require("node-cron");
const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");
const bimanProducto = mongoose.model("BimanProducto");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const {
  bimanProductoToWoo,
  bimanProductoToWooNoId,
  bimanProductoToWooBatch,
  wooProductoMap,
  bimanProductoToWooBatchNoID
} = require("./util/wooProductoMapper");

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_BASE_URL, // Your store URL
  consumerKey: process.env.CONSUMER_KEY, // Your consumer key
  consumerSecret: process.env.CONSUMER_SECRET, // Your consumer secret
  version: "wc/v3", // WooCommerce WP REST API version
});

let allowedOrigins = [""];

/* wooProducto.find({}, (err, docs)=>{
  if(!err && docs.length === 0){
    console.log("MongoDB está vacío")
    batchInicial()
  }else{
    console.log("MongoDB tiene registros de productos")
  }
}) */

cron.schedule("*/30 * * * * *", async () => {
  let pruebaNuevoObjeto = {
    nombreAlmacen: "PS Tienda Virtual NUEVO",
    ID: 55555,
    CodigoSap: "9999",
    NombreComercial: "IMPUESTO BOLSA NUEVO",
    nomGenerico: "Bolsa",
    VentaUnitaria: 12346,
    tasaIva: 0,
    existencia: 150,
    nomTipo: "FERRETERIA",
    Idservicio: 25,
    tasaDescuento: 0,
    Cantidad: 0
  }
  console.log("paso 1");

  const bimanProds = await bimanProducto.find({}, { _id: 0, __v: 0 });
  let coolecheraProds = await getCoolecheraProducts();
  coolecheraProds.push(pruebaNuevoObjeto)
  coolecheraProds[coolecheraProds.length - 1].VentaUnitaria = 123456

  if (bimanProds.length === 0) {
    await bimanProducto.insertMany(coolecheraProds);
  }

  if(JSON.stringify(bimanProds) !== JSON.stringify(coolecheraProds)){
    await bimanProducto.deleteMany({});
    await bimanProducto.insertMany(coolecheraProds);
  }
  let bimanProdsNew = await bimanProducto.find({}, { _id: 0, __v: 0 });
  
  let updates = [];
  let news = [];
  console.log("paso 2")
  const validateBimanProd = (objActual, bimanProd) => {
    return (
      objActual.NombreComercial === bimanProd.NombreComercial &&
      objActual.nomGenerico === bimanProd.nomGenerico &&
      objActual.VentaUnitaria === bimanProd.VentaUnitaria &&
      objActual.Cantidad === bimanProd.Cantidad
    );
  };

  bimanProdsNew.forEach((prod, index) => {
    if (index <= bimanProds.length - 1) {
      if (!validateBimanProd(prod, bimanProds[index])) {
        updates.push(bimanProductoToWooNoId(prod));
      }
    } else {
      news.push(prod);
    }
  });

  let wooProductsUpdates = [];
  console.log("Objetos a insertar")
  console.log(news.length)
  console.log("Updates length")
  console.log(updates.length)
  for (let i = 0; i < updates.length; i++) {
    try {
      const newProd = await wooProducto.find(
        { sku: updates[i].sku },
        { _id: 0, __v: 0 }
      );
      let newObj = updates[i]
      newObj.id = newProd[0].id
      wooProductsUpdates.push(newObj);
    } catch (e) {
      console.log(e);
    }
  }
  // return 0
  console.log("paso 3")
  if(wooProductsUpdates.length !== 0 || news.length !== 0){
    try{
      let toCreate = []
      //console.log(news[0])
      if(news.length !== 0)
      toCreate = bimanProductoToWooBatchNoID(news)

      if(news.length > 0){
        let createsWoo = await WooProductoBatchCreate(toCreate, 50)
        console.log("Crear productos")
        createsWoo.forEach((ele) =>{
          wooProducto.insertMany(ele.create, (err, docs)=>{
            if(err)console.log(err)
          });
        })
      }

      if(wooProductsUpdates.length > 0){
        wooProductsUpdates.forEach(async (element)=>{
          let res = await actualizarWooProducto(element.id, element)
          console.log("Objeto actualizado")
          console.log(res)
        })
        console.log("Actualizar producto en WooCommerce")
        wooProductsUpdates.forEach(element=>{
          wooProducto.findOneAndUpdate({id: element.id}, element)
        })
      }
      
    }catch(e){console.log(e)}
  }
  console.log("finalizado")
});

var app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // permite requests sin origen como los curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "La política CORS para esta API, no permite el acceso " +
          "desde este origen especificado.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

app.listen(process.env.PORT, () => {
  console.log(`Servidor Express inció en puerto : ${process.env.PORT}`);
});

app.use("/diaClient", diaClientController);
app.use("/wooClient", wooClientController);
app.use("/wooProducto", wooProductoController);
app.use("/dialogFlow", dialogFlowController);
