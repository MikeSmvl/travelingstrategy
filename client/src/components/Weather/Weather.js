import React, {useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';


const weather = {
  icon1: 'CLEAR_DAY',
  icon2: 'PARTLY_CLOUDY_DAY',
  icon3: 'CLOUDY',
  icon4: 'RAIN',
  icon5: 'SLEET',
  icon6: 'SNOW',
  icon7: 'WIND',
  icon8: 'FOG',
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



function Weather(props) {
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const {
		lat = '',
		lng = ''
	} = props;
  // const[weather, setWeather] = useState('Not available yet');

 
  useEffect(() => {
     async function fetchData() {

      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
         await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0bd6aca8cf0481c6aed071562937a466/${lat},${lng}`)
        .then((response)=>response.json()) // call this function when res is loaded
        // return a Promise with result of above function
        .then(response =>{data.icon = response.currently.icon})
        switch(data.icon){
          case 'clear-day':
            setIcon(weather.icon1)
            setColor(weather.color1)
            break;
          case 'partly-cloudy-day':
            setIcon(weather.icon2)
            setColor(weather.color1)
            break;
          case 'coudy':
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
    fetchData()
  });

  return (
    <div>
      <h3>hello</h3>
      <ReactAnimatedWeather
    icon={icon}
    color={weather.color3}
    size={weather.size}
    animate={weather.animate}
  />
    </div>
  )
}

export default Weather;