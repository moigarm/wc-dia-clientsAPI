const mongoose = require("mongoose");
const diaClient = mongoose.model("diaClient");

module.exports = function diaClientMap(diaClientFromWebhook, habilitado) {
  if (habilitado === null) cliente.habilitado = true;
  else cliente.habilitado = habilitado;
  let cliente = new diaClient();
  // Cambiar propiedades de acuerdo al nombre de los parámetros en DialogFlow
  cliente.email = diaClientFromWebhook.Correo;
  cliente.firstName = diaClientFromWebhook.Usario;
  cliente.lastName = diaClientFromWebhook.lastName;
  cliente.displayName = diaClientFromWebhook.displayName;
  cliente.phoneNumbers = diaClientFromWebhook.phoneNumbers;
  return cliente;
};