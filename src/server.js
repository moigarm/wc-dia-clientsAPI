require("dotenv").config();
require("./models/db");

const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const diaClientController = require("./controllers/diaClientController");
const wooClientController = require("./controllers/wooClientController");
const wooProductoController = require("./controllers/wooProductoController");
const { convertToCronSyntax } = require("./util/timeConverter")

//Endpoint for testing purposes
const dialogFlowController = require("./controllers/dialogFlowController");

var cron = require("node-cron");

const { cron } = require("./cronSchedule")

let allowedOrigins = [""];
let secondsFromEnv = process.env.CRON_SECONDS
const cronValue = convertToCronSyntax(secondsFromEnv)

console.log("SECONDS: "+secondsFromEnv)
console.log("CRON VALUE IS: "+cronValue)
cron.schedule(cronValue, async() =>{
  await cron()
});

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


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Colechera a WooCommerce",
      description: "API encargado de reflejar los datos obtenidos de Biman a WooCommerce,"+
      " datos de clientes potenciales de DialogFlow a SuiteCRM, datos de clientes al ordenar "+
      "un producto en WooCommerce a suiteCRM",
      contact: {
        name: "HayTic"
      },
      servers: [`http://localhost:${process.env.PORT}`]
    }
  },
  apis: ["src/controllers/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT, () => {
  console.log(`Servidor Express inció en puerto : ${process.env.PORT}`);
});


app.use("/diaClient", diaClientController);
app.use("/wooClient", wooClientController);
app.use("/wooProducto", wooProductoController);
app.use("/dialogFlow", dialogFlowController);
