function convertToCronSyntax(secondsParam){
    try{
        seconds = parseFloat(secondsParam)
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
    }catch(e){
        console.log("Por favor escribe un número con formato correcto [SEGUNDOS PARA CRON JOB]")
    }
    return response
}

module.exports = {
    convertToCronSyntax
}