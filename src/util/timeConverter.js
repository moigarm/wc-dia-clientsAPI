function convertToCronSyntax(seconds){
    return "*/"+seconds
}

function convertToCronSyntax2(seconds){
    let response = ""
    if (seconds > 60){
        let minutes = seconds/60
        minutes = Math.abs(minutes)
        let decimalSeconds = minutes - Math.floor(minutes)
        let finalSeconds = Math.round(60 * decimalSeconds)
        response = `*/${finalSeconds} */${Math.trunc(minutes)} * * * *`
    }else{
        response = `*/${seconds} * * * * *`
    }
    return response
}

module.exports = {
    convertToCronSyntax,
    convertToCronSyntax2,
}