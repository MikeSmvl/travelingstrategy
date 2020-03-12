import * as React from 'react';

const weather = {
  icon1: 'CLEAR_DAY',
  icon2: 'CLEAR_NIGHT',
  icon3: 'PARTLY_CLOUDY_DAY',
  icon4: 'PARTLY_CLOUDY_NIGHT',
  icon5: 'CLOUDY',
  icon6: 'RAIN',
  icon7: 'DRIZZLE',
  icon8: 'SNOW',
  icon9: 'WIND',
  icon10: 'FOG',
  color1: 'goldenrod',
  color2: 'blue',
  color3: 'gray',
  color4: 'black',
  color5: 'white',
  size: 50,
  animate: true
};

const data = {
  icon : ''
}

function setSkycon(icon, setColor, setIcon) {
  //fetch the appropraite icon repective to the city
  switch(icon){
    case 'clear-day':
      setIcon(weather.icon1)
      setColor(weather.color1)
      break;
    case 'clear-night':
      setIcon(weather.icon2)
      setColor(weather.color1)
      break;
    case 'partly-cloudy-day':
      setIcon(weather.icon3)
      setColor(weather.color1)
      break;
    case 'partly-cloudy-night':
      setIcon(weather.icon4)
      setColor(weather.color1)
    case 'cloudy':
      setIcon(weather.icon3)
      setColor(weather.color2)
      break;
    case 'rain':
      setIcon(weather.icon4)
      setColor(weather.color3)
      break;
    case 'sleet':
      setIcon(weather.icon5)
      setColor(weather.color3)
      break;
    case 'snow':
      setIcon(weather.icon6)
      setColor(weather.color4)
      break;
    case 'wind':
      setIcon(weather.icon7)
      setColor(weather.color5)
      break;
    case 'fog':
      setIcon(weather.icon8)
      setColor(weather.color3)
      break;
    }
}

export {setSkycon};