require("dotenv").config();
require("./models/db");

const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");

const diaClientController = require("./controllers/diaClientController");
const wooClientController = require("./controllers/wooClientController");
const wooProductoController = require("./controllers/wooProductoController");

//Endpoint for testing purposes
const dialogFlowController = require("./controllers/dialogFlowController");
const GetAccessToken = require("./util/accessToken");
const { default: axios } = require("axios");

let allowedOrigins = [""];

(async () => {
  console.log(await GetAccessToken());
  const params = new URLSearchParams();
  params.append("IdUnidad", 2);
  params.append("IdSede", 25);
  params.append("IdProducto", 0);

  const products = await axios.post(
    "https://biman.coolechera.com:3210/api/productos/porUnidadServicio",
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(products.data.length);
  const categories = [];

  products.data.forEach((p) => {
    categories.push(p.nomTipo);
  });
  console.log(new Set(categories));
})();

var app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // permite requests sin origen como los curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          "La política CORS para esta API, no permite el acceso " +
          "desde este origen especificado.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

app.listen(process.env.PORT, () => {
  console.log(`Servidor Express inció en puerto : ${process.env.PORT}`);
});

app.use("/diaClient", diaClientController);
app.use("/wooClient", wooClientController);
app.use("/wooProducto", wooProductoController);
app.use("/dialogFlow", dialogFlowController);
