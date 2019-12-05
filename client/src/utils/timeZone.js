const cityTimezones = require('city-timezones');

function getTimeZone(city){
    var timeAtLocation
    try{
        var timezone = cityTimezones.lookupViaCity(city)[0].timezone
        var options = {
            timeZone: timezone,
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        }, formatter = new Intl.DateTimeFormat([], options)

        formatter.format(new Date())
        timeAtLocation = (new Date()).toLocaleString([], options)
        timeAtLocation = timeAtLocation.substr(0,timeAtLocation.length-3) //REmoving seconds
        console.log("city: "+city)
        console.log("time-zone: "+timezone)
        console.log("time At Location: "+timeAtLocation)

    }
    catch(error){
        console.log("Could not get timezone of "+city)
    }

    return timeAtLocation


}

export default getTimeZone;