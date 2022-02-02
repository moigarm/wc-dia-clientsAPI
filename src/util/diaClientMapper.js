const mongoose = require("mongoose");
const diaClient = mongoose.model("diaClient");

module.exports = function diaClientMap(diaClientFromWebhook, habilitado) {
  let cliente = new diaClient();
  if (habilitado === null) cliente.habilitado = true;
  else cliente.habilitado = habilitado;

  // Cambiar propiedades de acuerdo al nombre de los parámetros en DialogFlow
  cliente.email = diaClientFromWebhook.Correo;
  cliente.firstName = diaClientFromWebhook.Nombre;
  cliente.lastName = diaClientFromWebhook.Aplleido;
  cliente.phoneNumbers = diaClientFromWebhook.Telefono;
  console.log(cliente);
  return cliente;
};
