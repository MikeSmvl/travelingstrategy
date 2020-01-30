
function getTimeDifference(utc_offset_origin, utc_offse_destination, originCity){
    var time_difference
    if(utc_offset_origin !== 'Not available yet' &&  utc_offse_destination !== 'Not available yet'){
        time_difference = utc_offse_destination-utc_offset_origin
        if(utc_offset_origin > utc_offse_destination){
            return "Time Difference: "+time_difference+"H"
        }
        else{
            return "Time Difference: +"+time_difference+"H"
        }

    }
    return null
}


export default getTimeDifference;