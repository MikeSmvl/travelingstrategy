const cityTimezones = require('city-timezones');
var country = require('country-list-js');

function getTimeZone(city,destinationCountry){
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
        // console.log("city: "+destinationCity)
        // console.log("time-zone: "+timezone)
        // console.log("time At Location: "+timeAtLocation)
    }
    catch(error){
        // console.log("Could not get timezone of "+city)
        var firstE = city.indexOf("e")
        city = city.substr(0,firstE) + "é" + city.substr(firstE+1) // replacing the first e with é
        timeAtLocation = handleErrorForSomeCities(city,destinationCountry, firstE)
        return timeAtLocation
    }
    return timeAtLocation

}

function handleErrorForSomeCities(city,destinationCountry, firstE){
    var timeZone
    if(firstE >= 0){
        city = city.substr(0,firstE) + "é" + city.substr(firstE+1) // replacing the first e with é
        timeZone = getTimeZone(city,destinationCountry)
        return timeZone
    }
    else{ // Return the time zone of the capital of the country of destination
        // console.log("Getting time zone of the capital of the country of destination("+destinationCountry+")")
        var countryOfDestination = country.findByIso2(destinationCountry)
        timeZone = getTimeZone(countryOfDestination.capital,destinationCountry)
        var timeZoneOfCapital = "Time in the capital "+ countryOfDestination.capital+ " "+timeZone
        // console.log(timeZoneOfCapital)
        return(timeZoneOfCapital)
    }
}

function findTimeZoneDifference(originCity,destinationCity,originCountry,destinationCountry){
    // var timeZoneAtOrgin= getTimeZone(originCity, originCountry)
    var timeZoneAtdestination= getTimeZone(destinationCity, destinationCountry)
    // var timeZoneAndDifference = timeZoneAtOrgin + "\n\n\n" + timeZoneAtdestination
    // console.log(timeZoneAndDifference)
    return timeZoneAtdestination
}

export default findTimeZoneDifference;