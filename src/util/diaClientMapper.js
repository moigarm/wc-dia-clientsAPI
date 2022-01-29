const mongoose = require("mongoose");
const diaClient = mongoose.model("diaClient");

module.exports = function diaClientMap(diaClientFromWebhook, habilitado) {
  if (habilitado === null) cliente.habilitado = true;
  else cliente.habilitado = habilitado;
  let cliente = new diaClient();
  cliente.email = diaClientFromWebhook.email;
  cliente.firstName = diaClientFromWebhook.firstName;
  cliente.lastName = diaClientFromWebhook.lastName;
  cliente.displayName = diaClientFromWebhook.displayName;
  cliente.phoneNumbers = diaClientFromWebhook.phoneNumbers;
  return cliente;
};