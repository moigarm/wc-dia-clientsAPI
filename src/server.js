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

const getCoolecheraProducts = require("./util/getCoolecheraProducts");
var cron = require("node-cron");
const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");
const bimanProducto = require("./models/bimmanProductoModel");
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const {
  bimanProductoToWoo,
  bimanProductoToWooNoId,
  bimanProductoToWooBatch,
} = require("./util/wooProductoMapper");

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_BASE_URL, // Your store URL
  consumerKey: process.env.CONSUMER_KEY, // Your consumer key
  consumerSecret: process.env.CONSUMER_SECRET, // Your consumer secret
  version: "wc/v3", // WooCommerce WP REST API version
});

let allowedOrigins = [""];

cron.schedule("*/10 * * * * *", async () => {
  console.log("hola");

  const bimanProds = await bimanProducto.find({}, { _id: 0, __v: 0 });
  let coolecheraProds = await getCoolecheraProducts();

  if (bimanProds.length === 0) {
    await bimanProducto.insertMany(coolecheraProds);
  }
  let bimanProdsNew;
  console.log(JSON.stringify(bimanProds) === JSON.stringify(coolecheraProds));
  if (JSON.stringify(bimanProds) !== JSON.stringify(coolecheraProds)) {
    await bimanProducto.deleteMany({});
    await bimanProducto.insertMany(coolecheraProds);
    bimanProdsNew = await bimanProducto.find({}, { _id: 0, __v: 0 });
  }
  let updates = [];
  let news = [];
  bimanProdsNew.forEach((prod, index) => {
    if (index <= bimanProds.length - 1) {
      if (JSON.stringify(prod) !== JSON.stringify(bimanProds[index])) {
        updates.push(bimanProductoToWooNoId(prod));
      }
    } else {
      news.push(prod);
    }
  });

  let wooProductsUpdates = [];
  for (let i = 0; i < updates.length; i++) {
    try {
      console.log("KHASDFBAJHSDAVBN SVDASVHJDAKUSYDA");
      const newProd = await wooProducto.findOneAndUpdate(
        { sku: updates[i].sku },
        updates[i]
      );
      wooProductsUpdates.push(newProd);
    } catch (e) {
      console.log(e);
    }
  }
  const woores = await WooCommerce.post("products/batch", {
    update: wooProductsUpdates,
    create: bimanProductoToWooBatch(news).create,
  });

  await wooProducto.insertMany(woores.data.create);
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
