
function getTimeDifference(utc_offset_origin, utc_offse_destination){
    var time_difference
    if(utc_offset_origin !== 'Not available yet' &&  utc_offse_destination !== 'Not available yet'){
        time_difference = utc_offse_destination-utc_offset_origin
        if(utc_offset_origin > utc_offse_destination){
            return time_difference+"H from"
        }
        else{
            return "+"+time_difference+"H from"
        }

    }
    return null
}


export default getTimeDifference;