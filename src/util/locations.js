require('dotenv').config()
let BimanInstance = process.env.BIMAN_BASE_URL
let wooCommerceInstance = process.env.WOOCOMMERCE_BASE_URL

function comesFromBiman_Woo(origin){
    console.log("El origen es: "+origin)
    let type = ""
    switch (origin){
        case BimanInstance:
            type = "biman"
            break
        case wooCommerceInstance:
            type = "woo"
            break
        default:
            console.log("El origen es: "+origin)
            break
    }
    // Eliminar este tipo de comentarios por 
    console.log("Type is: "+type)
    return type
}

module.exports = {
    comesFromBiman_Woo
}