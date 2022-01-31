require("dotenv").config();

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_BASE_URL, // Your store URL
  consumerKey: process.env.CONSUMER_KEY, // Your consumer key
  consumerSecret: process.env.CONSUMER_SECRET, // Your consumer secret
  version: "wc/v3", // WooCommerce WP REST API version
});

async function crearWooProducto(obj) {
  let res1 = {};
  try {
    let datos = await WooCommerce.post("products", obj);
    res1 = datos.data;
  } catch (error) {
    console.log(error);
  }
  return res1;
}

async function actualizarWooProducto(id, obj) {
  let res1 = {};
  try {
    let datos = await WooCommerce.put(`products/${id}`, obj);
    res1 = datos.data;
  } catch (error) {
    console.log(error);
  }
  return res1;
}

async function WooProductoBatch(objs) {
  let res1 = {};
  try {
    let datos = await WooCommerce.post("products/bacth", objs);
    res1 = datos.data;
  } catch (error) {
    console.log(error);
  }
  return res1;
}
module.exports = {
  crearWooProducto,
  actualizarWooProducto,
  WooProductoBatch,
};
