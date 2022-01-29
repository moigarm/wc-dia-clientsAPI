require('dotenv').config()
let dialogFlowInstance = process.env.DIALOGFLOW_BASE_URL
let wooCommerceInstance = process.env.WOOCOMMERCE_BASE_URL

function comesFromCRM_DialogFlow(req){
    let url = req.hostname
    switch (url){
        case dialogFlowInstance:
            return "dia"
        case wooCommerceInstance:
            return "woo"
        default:
            console.log(url)
            return ""
    }
}

module.exports = {
    comesFromCRM_DialogFlow
}