const axios = require("axios");

module.exports = async function getCoolecheraProducts() {
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
  return products.data;
};
