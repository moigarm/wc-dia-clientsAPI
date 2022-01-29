require("dotenv").config();

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
    url: 'http://woocommerce.cu.ma', // Your store URL
    consumerKey: process.env.CONSUMER_KEY, // Your consumer key
    consumerSecret: process.env.CONSUMER_SECRET, // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
})

function crearProducto(obj){
    WooCommerce.post("products", obj)
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

function actualizarProducto(id, obj){
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
    crearProducto,
    actualizarProducto
}