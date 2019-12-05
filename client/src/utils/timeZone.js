const cityTimezones = require('city-timezones');

function getTimeZone(city){
    var timeAtLocation

    try{
        var timezone = cityTimezones.lookupViaCity(city)[0].timezone
        var options = { // Format of Time Zone
            timeZone: timezone,
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        },
        formatter = new Intl.DateTimeFormat([], options)
        formatter.format(new Date())

        timeAtLocation = (new Date()).toLocaleString([], options)
        timeAtLocation = timeAtLocation.substr(0,timeAtLocation.length-3) //Removing seconds
        console.log("city: "+city)
        console.log("time-zone: "+timezone)
        console.log("time At Location: "+timeAtLocation)
    }
    catch(error){
        console.log("Could not get timezone of "+city)
        var firstE = city.indexOf("e")
        city = city.substr(0,firstE) + "é" + city.substr(firstE+1) // replacing the first e with é
        handleErrorForSomeCities(city,firstE)
    }
    return timeAtLocation

}

function handleErrorForSomeCities(city, firstE){
    if(firstE >= 0){
        city = city.substr(0,firstE) + "é" + city.substr(firstE+1) // replacing the first e with é
        return getTimeZone(city)
    }
    return null
}

export default getTimeZone;