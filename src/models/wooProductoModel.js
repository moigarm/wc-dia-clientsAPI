const mongoose = require("mongoose");

const generateSchema = require("generate-schema");
var wooProducto = new mongoose.Schema({
  id: {
    type: String,
  },
  internal_id: {
    type: String,
  },
  name: {
    type: String,
  },
  tasaiva: {
    type: String,
  },
  nomgenerico: {
    type: String,
  },
  slug: {
    type: String,
  },
  permalink: {
    type: String,
  },
  date_created: {
    type: String,
  },
  date_created_gmt: {
    type: String,
  },
  date_modified: {
    type: String,
  },
  date_modified_gmt: {
    type: String,
  },
  type: {
    type: String,
  },
  status: {
    type: String,
  },
  featured: {
    type: Boolean,
  },
  catalog_visibility: {
    type: String,
  },
  description: {
    type: String,
  },
  short_description: {
    type: String,
  },
  sku: {
    type: String,
  },
  price: {
    type: String,
  },
  regular_price: {
    type: String,
  },
  sale_price: {
    type: String,
  },
  date_on_sale_from: {
    type: String,
  },
  date_on_sale_from_gmt: {
    type: String,
  },
  date_on_sale_to: {
    type: String,
  },
  date_on_sale_to_gmt: {
    type: String,
  },
  on_sale: {
    type: Boolean,
  },
  purchasable: {
    type: Boolean,
  },
  total_sales: {
    type: Number,
  },
  virtual: {
    type: Boolean,
  },
  downloadable: {
    type: Boolean,
  },
  downloads: {
    type: [String],
  },
  download_limit: {
    type: Number,
  },
  download_expiry: {
    type: Number,
  },
  external_url: {
    type: String,
  },
  button_text: {
    type: String,
  },
  tax_status: {
    type: String,
  },
  tax_class: {
    type: String,
  },
  manage_stock: {
    type: Boolean,
  },
  stock_quantity: {
    type: Number,
  },
  backorders: {
    type: String,
  },
  backorders_allowed: {
    type: Boolean,
  },
  backordered: {
    type: Boolean,
  },
  low_stock_amount: {
    type: Boolean,
  },
  sold_individually: {
    type: Boolean,
  },
  weight: {
    type: String,
  },
  dimensions: {
    _id: false,
    length: {
      type: String,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
  },
  shipping_required: {
    type: Boolean,
  },
  shipping_taxable: {
    type: Boolean,
  },
  shipping_class: {
    type: String,
  },
  shipping_class_id: {
    type: Number,
  },
  reviews_allowed: {
    type: Boolean,
  },
  average_rating: {
    type: String,
  },
  rating_count: {
    type: Number,
  },
  upsell_ids: {
    type: [String],
  },
  cross_sell_ids: {
    type: [String],
  },
  parent_id: {
    type: Number,
  },
  purchase_note: {
    type: String,
  },
  categories: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
  tags: [
    {
      _id: false,
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      slug: {
        type: String,
      },
    },
  ],
  images: [
    {
      _id: false,
      src: {
        type: String,
      },
    },
  ],
  attributes: {
    type: [
      {
        id: Number,
        name: String,
        option: String,
      },
    ],
  },
  default_attributes: {
    type: [String],
  },
  variations: {
    type: [String],
  },
  grouped_products: {
    type: [String],
  },
  menu_order: {
    type: Number,
  },
  price_html: {
    type: String,
  },
  related_ids: {
    type: [String],
  },
  meta_data: {
    type: [
      {
        key: String,
        value: String,
        _id: false,
      },
    ],
  },
  stock_status: {
    type: String,
  },
  _links: {
    self: [
      {
        _id: false,
        href: {
          type: String,
        },
      },
    ],
    collection: [
      {
        _id: false,
        href: {
          type: String,
        },
      },
    ],
  },
});

const alternativeSchema = generateSchema.mongoose({
  id: 188,
  name: "CUBIERTOS KUBI",
  slug: "cubiertos-kubi",
  permalink: "http://localhost:3000/product/cubiertos-kubi/",
  date_created: "2022-02-02T16:08:57",
  date_created_gmt: "2022-02-02T16:08:57",
  date_modified: "2022-02-02T16:08:57",
  date_modified_gmt: "2022-02-02T16:08:57",
  type: "simple",
  status: "publish",
  featured: false,
  catalog_visibility: "visible",
  description: "",
  short_description: "",
  sku: "4152",
  price: "420",
  regular_price: "420",
  sale_price: "",
  date_on_sale_from: null,
  date_on_sale_from_gmt: null,
  date_on_sale_to: null,
  date_on_sale_to_gmt: null,
  on_sale: false,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  downloadable: false,
  downloads: [],
  download_limit: -1,
  download_expiry: -1,
  external_url: "",
  button_text: "",
  tax_status: "taxable",
  tax_class: "",
  manage_stock: false,
  stock_quantity: null,
  backorders: "no",
  backorders_allowed: false,
  backordered: false,
  low_stock_amount: null,
  sold_individually: false,
  weight: "",
  dimensions: [Object],
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: "",
  shipping_class_id: 0,
  reviews_allowed: true,
  average_rating: "0",
  rating_count: 0,
  upsell_ids: [],
  cross_sell_ids: [],
  parent_id: 0,
  purchase_note: "",
  categories: [Array],
  tags: [],
  images: [],
  attributes: [],
  default_attributes: [],
  variations: [],
  grouped_products: [],
  menu_order: 0,
  price_html:
    '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">C&#36;</span>420.00</bdi></span>',
  related_ids: [Array],
  meta_data: [],
  stock_status: "instock",
  _links: [Object],
});

mongoose.model("wooProducto", wooProducto);
