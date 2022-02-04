const mongoose = require("mongoose");

const template = `"nombreAlmacen": "PS Tienda Virtual",
        "ID": 3814,
        "CodigoSap": "3906",
        "NombreComercial": "YOGURT FRESA X 1,000 GR",
        "nomGenerico": "Yogurt",
        "VentaUnitaria": 7330,
        "tasaIva": 19,
        "existencia": 3000,
        "nomTipo": "YOGURT",
        "Idservicio": 25,
        "tasaDescuento": 0,
        "Cantidad": 0`;

const BimmanProductSchema = mongoose.Schema({
  nombreAlmacen: {
    type: String,
  },
  ID: Number,
  CodigoSap: String,
  NombreComercial: String,
  nomGenerico: String,
  VentaUnitaria: Number,
  tasaIva: Number,
  existencia: Number,
  nomTipo: String,
  Idservicio: Number,
  tasaDescuento: Number,
  Cantidad: Number,
});
mongoose.model("BimanProducto", BimmanProductSchema);
