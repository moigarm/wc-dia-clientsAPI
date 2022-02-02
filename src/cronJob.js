const cron = require('node-cron')

//run this every 2 minutes
let task =  cron.schedule('*/2 * * * *', () => {
//     2. algoritmo chetado para scrapping en biman y
//    actualización de acorde a WooCommerce (Cron job)
// 2.1 determinar con variable de entorno el rango de tiempo
//     con el que se va a ejecutar el scrapping y diffing function
// 2.2 pedir todos los productos de biman API
// 2.3 convertir los productos a la forma de WooCommerce
// 2.4 comparar cada producto con los presentes en MongoDB
//     en un foreach que examine n objetos a la vez
// 2.5 crear un objeto al finalizar el análisis con
//     la estructura {create:[], update:[], delete:[]}
// 2.6 ingresar el objeto a la función wooProductoBatch2 para que
//     se encargue de propagar las diferencias entre biman y el API
//     en desarrollo a Woocommerce
// 2.7 console.log con los cambios hechos (create:[ids]...)


});

module.exports = task