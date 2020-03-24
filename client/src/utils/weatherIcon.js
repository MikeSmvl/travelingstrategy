

const weather = {
  icon1: 'CLEAR_DAY',
  icon2: 'CLEAR_NIGHT',
  icon3: 'PARTLY_CLOUDY_DAY',
  icon4: 'PARTLY_CLOUDY_NIGHT',
  icon5: 'CLOUDY',
  icon6: 'RAIN',
  icon7: 'SLEET',
  icon8: 'SNOW',
  icon9: 'WIND',
  icon10: 'FOG',
  color1: 'goldenrod',
  color2: 'blue',
  color3: 'gray',
  color4: 'black',
  color5: 'silver',
  animate: true
};

const data = {
  icon : '',
  color : ''
}

function setSkycon(icon) {
  //fetch the appropraite icon repective to the city
  switch(icon){
    case 'clear-day':
      data.icon= weather.icon1
      data.color= weather.color1
      break;
    case 'clear-night':
      data.icon= weather.icon2
      data.color= weather.color4
      break;
    case 'partly-cloudy-day':
      data.icon= weather.icon3
      data.color= weather.color1
      break;
    case 'partly-cloudy-night':
      data.icon= weather.icon4
      data.color= weather.color3
      break;
    case 'cloudy':
      data.icon= weather.icon5
      data.color= weather.color3
      break;
    case 'rain':
      data.icon= weather.icon6
      data.color= weather.color3
      break;
    case 'drizzle':
      data.icon= weather.icon6
      data.color= weather.color3
      break;
    case 'sleet':
      data.icon= weather.icon8
      data.color= weather.color3
      break;
    case 'snow':
      data.icon= weather.icon8
      data.color= weather.color5
      break;
    case 'wind':
      data.icon= weather.icon9
      data.color= weather.color3
      break;
    case 'fog':
      data.icon= weather.icon10
      data.color= weather.color3
      break;
    default:
      data.icon= weather.icon1
      data.color= weather.color1
      break;
    }

    return data
}

export {setSkycon};