const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");
const bimanProducto = mongoose.model("BimanProducto");
const categoriesModel = mongoose.model("categories");
const bimanCategoriesModel = mongoose.model("bimanCategories");
const {
  bimanProductoToWooNoId,
  MapCategoriesToProds,
  bimanProductoToWooNoId2,
  bimanProductoToWooBatchNoID,
} = require("./util/wooProductoMapper");

const getCoolecheraProducts = require("./util/getCoolecheraProducts");

const { batchInicial } = require("./util/batchInicial");
const {
  WooProductoBatchCreate,
  actualizarWooProducto,
  setCategoriesFinal,
  getCategoriesList,
} = require("./util/WooCommerceAPI");


async function cron() {
    let pruebaNuevoObjeto = {
    nombreAlmacen: "PS Tienda Virtual NUEVO",
    ID: 55555,
    CodigoSap: "9999",
    NombreComercial: "IMPUESTO BOLSA NUEVO",
    nomGenerico: "Bolsa",
    VentaUnitaria: 1110,
    tasaIva: 0,
    existencia: 150,
    nomTipo: "NUEVA CATEGORIA",
    Idservicio: 25,
    tasaDescuento: 0,
    Cantidad: 0,
    };

    console.log("paso 1");

    //console.log(await wooProducto.findOne({ sku: "7055" }));
    try{
    const bimanProds = await bimanProducto.find({}, { _id: 0, __v: 0 });
    let coolecheraProds = await getCoolecheraProducts();
    //coolecheraProds.push(pruebaNuevoObjeto)
    //coolecheraProds[coolecheraProds.length - 1].VentaUnitaria = 147852
    //coolecheraProds[coolecheraProds.length - 1].existencia = 1000
    // coolecheraProds[coolecheraProds.length - 1].nomTipo = "CATEGORIA ROCHA"
    //coolecheraProds[coolecheraProds.length - 1].nomTipo = "AVENA"
    //coolecheraProds[coolecheraProds.length - 1].nomTipo = "AREQUIPE"
    
    const bimanCategories = await bimanCategoriesModel.find(
    {},
    { _id: 0, __v: 0 }
    );
    let coolecheraCatTemp = getCategoriesList(coolecheraProds);
    let coolecheraCategories = [];
    coolecheraCatTemp.forEach((ele) => {
    coolecheraCategories.push({ name: ele });
    });
    if (bimanCategories.length === 0) {
    await bimanCategoriesModel.insertMany(coolecheraCategories);
    }

    if (bimanProds.length === 0) {
    await bimanProducto.insertMany(coolecheraProds);
    }

    if (JSON.stringify(bimanProds) !== JSON.stringify(coolecheraProds)) {
    await bimanProducto.deleteMany({});
    await bimanProducto.insertMany(coolecheraProds);
    }

    if (
    JSON.stringify(bimanCategories) !== JSON.stringify(coolecheraCategories)
    ) {
    await bimanCategoriesModel.deleteMany({});
    await bimanCategoriesModel.insertMany(coolecheraCategories);
    }

    let bimanProdsNew = await bimanProducto.find({}, { _id: 0, __v: 0 });
    let bimanCategoriesNew = await bimanCategoriesModel.find(
    {},
    { _id: 0, __v: 0 }
    );

    let updates = [];
    let news = [];
    console.log("paso 2");
    const validateBimanProd = (objActual, bimanProd) => {
    return (
        objActual.NombreComercial === bimanProd.NombreComercial &&
        objActual.nomGenerico === bimanProd.nomGenerico &&
        objActual.VentaUnitaria === bimanProd.VentaUnitaria &&
        objActual.Cantidad === bimanProd.Cantidad &&
        objActual.existencia === bimanProd.existencia &&
        objActual.nomTipo === bimanProd.nomTipo
    );
    };

    const validateBimanCategory = (objActual, bimanProdCategory) => {
    return objActual.name === bimanProdCategory.name;
    };

    newCategories = [];
    console.log("paso 2.1");
    //console.log(bimanCategoriesNew)
    // console.log(bimanCategories)
    
    ///
    /// REVISAR OVER FLOW (Fuera de índice)
    ///
    if (bimanCategories.length > 0) {
    bimanCategoriesNew.forEach((prod, index) => {
        if (!(index <= bimanCategories.length - 1)) {
        console.log(prod)
        console.log("COUNTERPART")
        console.log(bimanCategories[index])
        // if (validateBimanCategory(prod, bimanCategories[index])) {
            newCategories.push(prod);
        // }
        }
    });
    } else {
    bimanCategoriesNew.forEach((prod) => {
        newCategories.push(prod);
    });
    }
    console.log("CATEGORIES");
    console.log(newCategories);

    bimanProdsNew.forEach((prod, index) => {
    if (index <= bimanProds.length - 1) {
        if (!validateBimanProd(prod, bimanProds[index])) {
        updates.push(bimanProductoToWooNoId2(prod));
        }
    } else {
        news.push(prod);
    }
    });
    if (newCategories.length > 0) {
    let categoriesInWooCommerce = await setCategoriesFinal(newCategories);
    await categoriesModel.insertMany(categoriesInWooCommerce);
    console.log(categoriesInWooCommerce);
    }

    let WooCommerceProductCategories = await categoriesModel.find(
    {},
    { _id: 0, __v: 0 }
    );
    let wooProductsUpdates = [];
    console.log("Objetos a insertar");
    console.log(news.length);
    console.log("Updates length");
    console.log(updates.length);
    for (let i = 0; i < updates.length; i++) {
    try {
        console.log(updates[i])
        const newProd = await wooProducto.find(
        { sku: updates[i].sku },
        { _id: 0, __v: 0 }
        );
        let newObj = updates[i];
        console.log(newProd)
        newObj.id = newProd[0].id;
        console.log("Nombre categoría")
        console.log(newObj.categories)
        let categories = WooCommerceProductCategories.find(
        (obj) => obj.name === newObj.categories
        );
        console.log("EL MERO CATEGORY")
        console.log(categories)
        newObj.categories = [{id: categories.id}];
        wooProductsUpdates.push(newObj);
    } catch (e) {
        console.log(e);
    }
    }

    // return 0
    console.log("paso 3");
    if (wooProductsUpdates.length !== 0 || news.length !== 0) {
    try {
        let toCreate = [];
        //console.log(news[0])
        if (news.length !== 0) {
        let tempProds = bimanProductoToWooBatchNoID(news);

        toCreate = MapCategoriesToProds(
            tempProds,
            WooCommerceProductCategories
        );
        //console.log(toCreate[0]);
        }

        if (news.length > 0) {
        let createsWoo = await WooProductoBatchCreate(toCreate, 50);
        console.log("Crear productos");
        //console.log(createsWoo[0].create);
        createsWoo.forEach((ele) => {
            wooProducto.insertMany(ele.create, (err, docs) => {
            if (err) console.log(err);
            });
        });
        }

        if (wooProductsUpdates.length > 0) {
        wooProductsUpdates.forEach(async (element) => {
            console.log(element)
            let res = await actualizarWooProducto(element.id, element);
            console.log(res)
            /*  console.log("Objeto actualizado");
            console.log(res); */
        });
        console.log("Actualizar producto en WooCommerce");
        wooProductsUpdates.forEach((element) => {
            wooProducto.findOneAndUpdate({ id: element.id }, element);
        });
        }
    } catch (e) {
        console.log(e);
    }
    }
    }catch(e){
        console.log("ERROR FATAL");console.log(e)
    }
    console.log("finalizado");
}

module.exports = {cron}