require("dotenv").config();

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
    url: process.env.WOOCOMMERCE_BASE_URL, // Your store URL
    consumerKey: process.env.CONSUMER_KEY, // Your consumer key
    consumerSecret: process.env.CONSUMER_SECRET, // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
})

function crearWooProducto(obj){
    WooCommerce.post("products", obj)
  .then((response) => {
    let res = response.data
    console.log("Creando producto en WooCommerce")
    return res
  })
  .catch((error) => {
    let err = error.response.data
    console.log(err)
  });
}

function actualizarWooProducto(id, obj){
    WooCommerce.put(`products/${id}`, obj)
    .then((response) => {
        let res = response.data
        console.log(res)
        return {response: res, error: ""}
    })
    .catch((error) => {
        let err = error.response.data
        console.log(err)
        return {response: {}, error: err}
    });
}
module.exports={
    crearWooProducto,
    actualizarWooProducto
}