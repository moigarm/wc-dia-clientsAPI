require('dotenv').config()
let BimanInstance = process.env.BIMAN_BASE_URL
let wooCommerceInstance = process.env.WOOCOMMERCE_BASE_URL

function comesFromCRM_Biman(hostname){
    switch (hostname){
        case BimanInstance:
            return "biman"
        case wooCommerceInstance:
            return "woo"
        default:
            console.log(hostname)
            return ""
    }
}

module.exports = {
    comesFromCRM_Biman
}