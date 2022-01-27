const mongoose = require("mongoose");
const wooClient = mongoose.model("wooClient");

module.exports = function wooClientMap(wooClientFromWebhook, habilitado) {
  if (habilitado === null) cliente.habilitado = true;
  else cliente.habilitado = habilitado;
  let cliente = new wooClient();
  cliente.id = wooClientFromWebhook.id;
  cliente.email = wooClientFromWebhook.email;
  cliente.primer_nombre = wooClientFromWebhook.first_name;
  cliente.primer_apellido = wooClientFromWebhook.last_name;
  cliente.username = wooClientFromWebhook.username;
  cliente.phone = wooClientFromWebhook.billing.phone;
  return cliente;
};
