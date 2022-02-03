const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");
const { bimanProductoToWooBatch } = require("./wooProductoMapper");
const { WooProductoBatch2 } = require("./WooCommerceAPI");
const getCoolecheraProducts = require("./getCoolecheraProducts");

async function batchInicial(){
    const products = await getCoolecheraProducts();
    let productos = bimanProductoToWooBatch(products);
    responseFromService = await WooProductoBatch2(productos);
    let finalResult = [];
    responseFromService.forEach((element, i) => {
      wooProducto.insertMany(element.create, (err, docs) => {
        if (!err) {
          finalResult[i] = docs;
        } else {
          console.log(err);
          res.json({
            status: 404,
            message: `No se insertaron los registros de manera adecuada a MongoDB : ' + ${err}`,
          });
        }
      });
    });
}

module.exports = { batchInicial}