require('dotenv').config()


function getParameters(Objeto){
    let paramObj = Objeto?.queryResult?.parameters
    let params = process.env.DIALOG_PARAMS.split(",")
    
}

module.exports = [
    getParameters
]