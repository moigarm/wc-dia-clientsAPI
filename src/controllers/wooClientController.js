const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const wooClient = mongoose.model("wooClient");
const { wooClientMap } = require("../util/wooClientMapper");
const { default: axios } = require("axios");
const GetAccessToken = require("../util/accessToken");

router.post("/", (req, res) => {
  insertRecord(req, res);
});

router.put("/update", (req, res) => {
  updateRecord(req, res);
});

async function insertRecord(req, res) {
  console.log(req.body)
  console.log(typeof req.body.webhook_id)
  if(typeof req.body.webhook_id === "string")return 0
  try {
    console.log("Comienza push de cliente a suiteCRM")
    let newwooClient = wooClientMap(req.body.billing)
    console.log(newwooClient)
    let pric = new wooClient(newwooClient)
    await pric.save(async (err, doc) => {
    if (!err) {
      const token = await GetAccessToken();
      await axios.post(
        `${process.env.SUITE_CRM}/V8/module`,
        {
          data: {
            type: "Contacts",
            attributes: newwooClient,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      res.json({ status: 201, message: doc });
    } else
      res.json({ status: 404, message: `Error en Inserción : ' + ${err}` });
  });
  } catch (error) {
    console.log(error);
  }
}

function updateRecord(req, res) {
  try {
    
    wooClient.findOneAndUpdate(
      { _id: req.params.id },
      wooClientMap(req.body),
      (err, doc) => {
        if (!err)
        res.json({ status: 201, message: `Actualización satisfactoria` });
        else
        res.json({
          status: 404,
          message: `No se actualizó el registro : ' + ${err}`,
        });
      }
      );
    } catch (error) {
      console.log(error)
    }
}

router.get("/list", (req, res) => {
  try {
    
    wooClient.find((err, docs) => {
      if (err)
      res.json({
        status: 404,
        message: `Error durante la recuperación de datos : ' + ${err}`,
      });
      res.json({ status: 200, objects: docs });
    });
  } catch (error) {
    console.log(error)
  }
});

router.get("/:id", (req, res) => {
  try {
    
    wooClient.find({ id: req.params.id }, (err, doc) => {
      if (err)
      res.json({
        status: 404,
        message: `No se encontró el registro : ' + ${err}`,
      });
      res.json({ status: 200, object: doc });
    });
  } catch (error) {
    console.log(error)
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    
    wooClient.findOneAndUpdate(
      { _id: req.params.id },
      wooClientMap(req.body, false),
      (err, doc) => {
        if (!err) res.json({ status: 200, message: `Eliminación satisfactoria` });
        else
        res.json({
          status: 404,
          message: `No se eliminó el registro : ' + ${err}`,
        });
      }
      );
    } catch (error) {
      console.log(error)
    }
});

module.exports = router;
