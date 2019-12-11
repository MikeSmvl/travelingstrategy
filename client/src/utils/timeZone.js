const cityTimezones = require('city-timezones');
var country = require('country-list-js');
var originNotFound = false;
var destinationNotFound = false;
var capitalIfOriginNotFound = "";
var capitalIfDestinationNotFound = "";

/**
 * This method finds the difference between two dates
 * and returns the time at the destination and
 * the time difference between the origin and destination
 */
function findTimeZoneDifference(originCity,destinationCity,originCountry,destinationCountry){
    var timeZoneAndDifference
    var timeZoneAtOrgin= getTimeZone(originCity, originCountry, "origin")
    var timeZoneAtdestination= getTimeZone(destinationCity, destinationCountry, "destination")
    timeZoneAtOrgin = switchDayAndMonth(timeZoneAtOrgin)
    timeZoneAtdestination = switchDayAndMonth(timeZoneAtdestination)

    if(timeZoneAtOrgin == null || timeZoneAtdestination == null){
        console.log("TimeZone for origin or destination cannot be found")
        return null
    }

    const dateAtOrigin = new Date(timeZoneAtOrgin);
    const dateAtDestination = new Date(timeZoneAtdestination);
    var timeDifference = Math.round((dateAtDestination - dateAtOrigin)/3600000) //Converting to hours
    if(originNotFound){
        originCity = capitalIfOriginNotFound
    }
    if(destinationNotFound){
        timeZoneAtdestination = "Time in the capital the country of destination "+ capitalIfDestinationNotFound + " "+timeZoneAtdestination
    }

    if(timeDifference>0){ //Showing time difference with +
        timeZoneAndDifference = timeZoneAtdestination + " (+"+timeDifference+"H from "+originCity+")"
    }
    else{ //Showing time difference with -
        timeZoneAndDifference = timeZoneAtdestination + " ("+timeDifference+"H from "+originCity+")"
    }
    return timeZoneAndDifference
}

/**
 * The function returns the time at a given city
 * @param {*} city This is the city for which we need the time
 * @param {*} destinationCountry  If we don't find the time of city we get the time in the capital
 * @param {*} originOrDestination To mention if the city is the origin or destination
 */
function getTimeZone(city,destinationCountry, originOrDestination){
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
    }
    catch(error){
        console.log("Could not get timezone of "+city)
        var firstE = city.indexOf("e")
        city = city.substr(0,firstE) + "é" + city.substr(firstE+1) // replacing the first e with é
        timeAtLocation = handleErrorForSomeCities(city,destinationCountry, firstE,originOrDestination)
        return timeAtLocation
    }
    return timeAtLocation

}

/**
 * If the city chosen to find the time cannot be found in the library
 * We find the timezone in the capital of the country
 */
function handleErrorForSomeCities(city,destinationCountry, firstE,originOrDestination){
    var timeZone
    if(firstE >= 0){
        city = city.substr(0,firstE) + "é" + city.substr(firstE+1) // replacing the first e with é
        timeZone = getTimeZone(city,destinationCountry, originOrDestination)
        return timeZone
    }
    else{ // Return the time zone of the capital of the country of destination
        var countryForCapital = country.findByIso2(destinationCountry)

        timeZone = getTimeZone(countryForCapital.capital,destinationCountry)

        if(originOrDestination === "origin"){
            originNotFound = true
            capitalIfOriginNotFound = countryForCapital.capital
        }
        else if(originOrDestination === "destination"){
            destinationNotFound = true
            capitalIfDestinationNotFound = countryForCapital.capital
        }
        return(timeZone)
    }
}

/**
 *  The date function takes the following format: day/month/year
 *  However the timezone we have is in the format: month/day/year
 *  This function switches the day and the mont
 *  */
function switchDayAndMonth(time){
    var timeSplit = time.split("/")
    var dayMonthSwitched = timeSplit[1]+"/"+timeSplit[0]+"/"+timeSplit[2]

    return dayMonthSwitched
}



export default findTimeZoneDifference;