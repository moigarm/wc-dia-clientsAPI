const mongoose = require("mongoose");
const wooClient = mongoose.model("wooClient");

function wooClientMap(wooClientFromWebhook, habilitado) {
  // if (habilitado === null) wooClientFromWebhook.habilitado = true;
  // else wooClientFromWebhook.habilitado = habilitado;
  return {
    first_name : wooClientFromWebhook.first_name,
    last_name : wooClientFromWebhook.last_name,
    //company = wooClientFromWebhook.company, // suiteCRM sin este campo que provee el webhook de WooCommerce
    primary_address_street : wooClientFromWebhook.address_1,
    primary_address_city : wooClientFromWebhook.city,
    primary_address_state : wooClientFromWebhook.state,
    primary_address_postalcode : wooClientFromWebhook.postcode,
    primary_address_country : wooClientFromWebhook.country,
    email1 : wooClientFromWebhook.email,
    phone_mobile : wooClientFromWebhook.phone
  };
};

module.exports = {
  wooClientMap
}