const mongoose = require("mongoose");

var wooProducto = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    slug: {
        type: String
    },
    permalink: {
        type: String
    },
    date_created: {
        type: String
    },
    date_created_gmt: {
        type: String
    },
    date_modified: {
        type: String
    },
    date_modified_gmt: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    featured: {
        type: Boolean
    },
    catalog_visibility: {
        type: String
    },
    description: {
        type: String
    },
    short_description: {
        type: String
    },
    sku: {
        type: String
    },
    price: {
        type: mongoose.Decimal128
    },
    regular_price: {
        type: mongoose.Decimal128
    },
    sale_price: {
        type: mongoose.Decimal128
    },
    date_on_sale_from: {
        type: String
    },
    date_on_sale_from_gmt: {
        type: String
    },
    date_on_sale_to: {
        type: String
    },
    date_on_sale_to_gmt: {
        type: String
    },
    on_sale: {
        type: Boolean
    },
    purchasable: {
        type: Boolean
    },
    total_sales: {
        type: Number
    },
    virtual: {
        type: Boolean
    },
    downloadable: {
        type: Boolean
    },
    downloads: {
        type: [String]
    },
    download_limit: {
        type: Number
    },
    download_expiry: {
        type: Number
    },
    external_url: {
        type: String
    },
    button_text: {
        type: String
    },
    tax_status: {
        type: String
    },
    tax_class: {
        type: String
    },
    manage_stock: {
        type: Boolean
    },
    stock_quantity: {
        type: Number
    },
    backorders: {
        type: String
    },
    backorders_allowed: {
        type: Boolean
    },
    backordered: {
        type: Boolean
    },
    low_stock_amount: {
        type: Boolean
    },
    sold_individually: {
        type: Boolean
    },
    weight: {
        type: String
    },
    dimensions: {
        length: {
            type: String
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
    },
    shipping_required: {
        type: Boolean
    },
    shipping_taxable: {
        type: Boolean
    },
    shipping_class: {
        type: String
    },
    shipping_class_id: {
        type: Number
    },
    reviews_allowed: {
        type: Boolean
    },
    average_rating: {
        type: String
    },
    rating_count: {
        type: Number
    },
    upsell_ids: {
        type: [String]
    },
    cross_sell_ids: {
        type: [String]
    },
    parent_id: {
        type: Number
    },
    purchase_note: {
        type: String
    },
    categories: [
      {
        id: {
            type: String
        },
        name: {
            type: String
        },
        slug: {
            type: String
        }
      },
    ],
    tags: [
      {
        id: {
            type: String
        },
        name: {
            type: String
        },
        slug: {
            type: String
        }
      },
    ],
    images: {
        type: [String]
    },
    attributes: {
        type: [String]
    },
    default_attributes: {
        type: [String]
    },
    variations: {
        type: [String]
    },
    grouped_products: {
        type: [String]
    },
    menu_order: {
        type: Number
    },
    price_html: {
        type: String
    },
    related_ids: {
        type: [String]
    },
    meta_data: {
        type: [String]
    },
    stock_status: {
        type: String
    },
    _links: {
      self: [
        {
          href: {
            type: String
        },
        }
      ],
      collection: [
        {
          href: {
            type: String
        },
        }
      ]
    }
  });

mongoose.model("wooProducto", wooProducto);
