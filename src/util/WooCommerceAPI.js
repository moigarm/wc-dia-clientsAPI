require("dotenv").config();

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_BASE_URL, // Your store URL
  consumerKey: process.env.CONSUMER_KEY, // Your consumer key
  consumerSecret: process.env.CONSUMER_SECRET, // Your consumer secret
  version: "wc/v3", // WooCommerce WP REST API version
});

function getWooStatus(){
  let res = {}
  WooCommerce.get("system_status")
  .then((response) => {
    res = response.data
    console.log("No error")
  })
  .catch((error) => {
    console.log(error.response.data);
  });
  return res
}

async function crearWooProducto(obj) {
  let res1 = {};
  try {
    console.log("Crear producto 1")
    let datos = await WooCommerce.post("products", obj);
    console.log("Producto creado?")
    res1 = datos.data;
    console.log(res1)
  } catch (error) {
    //console.log(error);
    console.log("EFE creando producto")
  }
  return res1;
}

async function actualizarWooProducto(id, obj) {
  let res1 = {};
  try {
    let datos = await WooCommerce.put(`products/${id}`, obj);
    res1 = datos.data;
    console.log(res1)
  } catch (error) {
    console.log(error);
  }
  return res1;
}

async function WooProductoBatch(objs) {
  let res1 = [];
  try {
    await Promise.all(objs.map(async (element, i) => {
      res1[i] = await crearWooProducto(element)
    }))
    console.log("Did it finish?")
  } catch (error) {
    console.log("Error on batch")
    //console.log(error);
  }
  return res1;
}

async function WooProductoBatch2(objs) {
  let atemp = objs.create
  let response = []
  console.log(atemp.length)
  let variable = 100
  try {
    for (let increment = 0; increment < objs.create.length; increment+=variable) {
      let temp = { create: atemp.slice(increment, increment+variable), update: [], delete: []}
      let data = await WooCommerce.post("products/batch", temp)
      response[increment/variable] = data.data
      console.log("round: "+increment/variable)
    }
  } catch (error) {
    console.log("Error on batch")
    console.log(error);
  }
  return response
}
module.exports = {
  crearWooProducto,
  actualizarWooProducto,
  WooProductoBatch,
  getWooStatus,
  WooProductoBatch2,
};
