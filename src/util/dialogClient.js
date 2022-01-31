require('dotenv').config()

function getParameters(Objeto){
    let paramObj = Objeto?.queryResult?.parameters
    let params = process.env.DIALOG_PARAMS.split(",")
    let newObj = {}
    params.forEach((key)=>{
        newObj[key] = paramObj[key]
    })
    return newObj
}

module.exports = [
    getParameters
]