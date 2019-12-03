const cityTimezones = require('city-timezones');

function getTimeZone(){
    var city = "Paris"
    var timezone = cityTimezones.lookupViaCity(city)[0].timezone
    var options = {
        timeZone: timezone,
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
    }, formatter = new Intl.DateTimeFormat([], options)

    formatter.format(new Date())
    console.log()
    console.log("city: "+city)
    console.log("time-zone: "+timezone)
    console.log("time At Location: "+(new Date()).toLocaleString([], options))


}

export default getTimeZone;