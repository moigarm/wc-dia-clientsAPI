const mongoose = require("mongoose");
const wooProducto = mongoose.model("wooProducto");

function wooProductoMap(wooProductoFromWebhook, habilitado) {
  let newWooProducto = new wooProducto();
  if (habilitado === null) newWooProducto.habilitado = true;
  else newWooProducto.habilitado = habilitado;
  newWooProducto.id = wooProductoFromWebhook.id;
  newWooProducto.name = wooProductoFromWebhook.name;
  newWooProducto.slug = wooProductoFromWebhook.slug;
  newWooProducto.permalink = wooProductoFromWebhook.permalink;
  newWooProducto.date_created = wooProductoFromWebhook.date_created;
  newWooProducto.date_created_gmt = wooProductoFromWebhook.date_created_gmt;
  newWooProducto.date_modified = wooProductoFromWebhook.date_modified;
  newWooProducto.date_modified_gmt = wooProductoFromWebhook.date_modified_gmt;
  newWooProducto.type = wooProductoFromWebhook.type;
  newWooProducto.status = wooProductoFromWebhook.status;
  newWooProducto.featured = wooProductoFromWebhook.featured;
  newWooProducto.catalog_visibility = wooProductoFromWebhook.catalog_visibility;
  newWooProducto.description = wooProductoFromWebhook.description;
  newWooProducto.short_description = wooProductoFromWebhook.short_description;
  newWooProducto.sku = wooProductoFromWebhook.sku;
  newWooProducto.price = wooProductoFromWebhook.price;
  newWooProducto.regular_price = wooProductoFromWebhook.regular_price;
  newWooProducto.sale_price = wooProductoFromWebhook.sale_price;
  newWooProducto.date_on_sale_from = wooProductoFromWebhook.date_on_sale_from;
  newWooProducto.date_on_sale_from_gmt =
    wooProductoFromWebhook.date_on_sale_from_gmt;
  newWooProducto.on_sale_to = wooProductoFromWebhook.on_sale_to;
  newWooProducto.on_sale_to_gmt = wooProductoFromWebhook.on_sale_to_gmt;
  newWooProducto.on_sale = wooProductoFromWebhook.on_sale;
  newWooProducto.purchasable = wooProductoFromWebhook.purchasable;
  newWooProducto.total_sales = wooProductoFromWebhook.total_sales;
  newWooProducto.virtual = wooProductoFromWebhook.virtual;
  newWooProducto.downloadable = wooProductoFromWebhook.downloadable;
  newWooProducto.downloads = wooProductoFromWebhook.downloads;
  newWooProducto.download_limit = wooProductoFromWebhook.download_limit;
  newWooProducto.download_expiry = wooProductoFromWebhook.download_expiry;
  newWooProducto.external_url = wooProductoFromWebhook.external_url;
  newWooProducto.button_text = wooProductoFromWebhook.button_text;
  newWooProducto.tax_status = wooProductoFromWebhook.tax_status;
  newWooProducto.tax_class = wooProductoFromWebhook.tax_class;
  newWooProducto.manage_stock = wooProductoFromWebhook.manage_stock;
  newWooProducto.stock_quantity = wooProductoFromWebhook.stock_quantity;
  newWooProducto.backorders = wooProductoFromWebhook.backorders;
  newWooProducto.backorders_allowed = wooProductoFromWebhook.backorders_allowed;
  newWooProducto.backordered = wooProductoFromWebhook.backordered;
  newWooProducto.low_stock_amount = wooProductoFromWebhook.low_stock_amount;
  newWooProducto.sold_individually = wooProductoFromWebhook.sold_individually;
  newWooProducto.weight = wooProductoFromWebhook.weight;
  newWooProducto.dimensions.length = wooProductoFromWebhook.dimensions?.length;
  newWooProducto.dimensions.width = wooProductoFromWebhook.dimensions?.width;
  newWooProducto.dimensions.height = wooProductoFromWebhook.dimensions?.height;
  newWooProducto.shipping_required = wooProductoFromWebhook.shipping_required;
  newWooProducto.shipping_taxable = wooProductoFromWebhook.shipping_taxable;
  newWooProducto.shipping_class = wooProductoFromWebhook.shipping_class;
  newWooProducto.shipping_class_id = wooProductoFromWebhook.shipping_class_id;
  newWooProducto.reviews_allowed = wooProductoFromWebhook.reviews_allowed;
  newWooProducto.average_rating = wooProductoFromWebhook.average_rating;
  newWooProducto.rating_count = wooProductoFromWebhook.rating_count;
  newWooProducto.upsell_ids = wooProductoFromWebhook.upsell_ids;
  newWooProducto.cross_sell_ids = wooProductoFromWebhook.cross_sell_ids;
  newWooProducto.parent_id = wooProductoFromWebhook.parent_id;
  newWooProducto.purchase_note = wooProductoFromWebhook.purchase_note;
  //arreglo
  newWooProducto.categories = wooProductoFromWebhook.categories;
  //arreglo
  newWooProducto.tags = wooProductoFromWebhook.tags;
  newWooProducto.images = wooProductoFromWebhook.images;
  newWooProducto.attributes = wooProductoFromWebhook.attributes;
  newWooProducto.default_attributes = wooProductoFromWebhook.default_attributes;
  newWooProducto.variations = wooProductoFromWebhook.variations;
  newWooProducto.grouped_products = wooProductoFromWebhook.grouped_products;
  newWooProducto.menu_order = wooProductoFromWebhook.menu_order;
  newWooProducto.price_html = wooProductoFromWebhook.price_html;
  newWooProducto.related_ids = wooProductoFromWebhook.related_ids;
  newWooProducto.meta_data = wooProductoFromWebhook.meta_data;
  newWooProducto.stock_status = wooProductoFromWebhook.stock_status;
  newWooProducto._links.self = wooProductoFromWebhook._links?.self;
  newWooProducto._links.collection = wooProductoFromWebhook._links?.collection;
  return newWooProducto;
}
function newbimanProductoToWoo(objeto){
  console.log(objeto)
  let newObj = new wooProducto()
  newObj.internal_id = objeto.ID,
  newObj.nombre_almacen = objeto.nombreAlmacen, // agregar a WooCommerce
  newObj.categories[0] = {name: objeto.nomTipo},
  newObj.idservicio = objeto.Idservicio, // agregar a WooCommerce
  newObj.tasa_descuento = objeto.tasaDescuento, // agregar a WooCommerce
  newObj.stock_quantity = objeto.Cantidad,
  newObj.sku = objeto.CodigoSap, 
  newObj.name = objeto.NombreComercial,
  newObj.existencia = objeto.existencia, // agregar a WooCommerce
  newObj.regular_price = objeto.VentaUnitaria,
  newObj.tasaiva = objeto.tasaIva,
  //newObj.nomgenerico = objeto.nomGenerico
  newObj.meta_data = [{key: "nombre_generico", value: objeto.nomGenerico}] // agregar a WooCommerce
  return newObj
}

function bimanProductoToWoo(objeto){
  let newObj = new wooProducto()
  newObj.internal_id = objeto.ID,
  newObj.nombre_almacen = objeto.nombreAlmacen, // agregar a WooCommerce
  newObj.categories = [{name: objeto.nomTipo, slug: objeto.nomTipo.split(" ").join("-")}],
  newObj.idservicio = objeto.Idservicio, // agregar a WooCommerce
  newObj.tasa_descuento = objeto.tasaDescuento, // agregar a WooCommerce
  newObj.stock_quantity = objeto.Cantidad,
  newObj.sku = objeto.CodigoSap, 
  newObj.name = objeto.NombreComercial,
  newObj.existencia = objeto.existencia, // agregar a WooCommerce
  newObj.regular_price = objeto.VentaUnitaria,
  newObj.tasaiva = objeto.tasaIva,
  newObj.nomgenerico = objeto.nomGenerico // agregar a WooCommerce
  return newObj

  // nombreAlmacen, //
  // ID,
  // CodigoSap,
  // NombreComercial,
  // nomGenerico,
  // VentaUnitaria,
  // tasaIva,
  // existencia,
  // nomTipo,//
  // Idservicio,//
  // tasaDescuento,//
  // Cantidad//
}

function bimanProductoToWooBatch(objetos){
  let productosArray = []
  objetos.forEach((key, i)=>{
    productosArray[i] = bimanProductoToWoo(key)
  })
  console.log(productosArray[0])
  return {create: productosArray}
}

module.exports = {
  wooProductoMap,
  bimanProductoToWoo,
  bimanProductoToWooBatch,
  newbimanProductoToWoo
};
