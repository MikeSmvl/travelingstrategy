import React, {useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import { setSkycon } from '../../utils/weatherIcon';


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



const Icon = (props) => {
  const [icon, setIcon] = useState(data.icon);
  const {
		lat = '',
		lng = ''
	} = props;


  const [color, setColor] = useState('Not Available Yet');

  useEffect(() => {
     async function fetchData() {

      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
       await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0bd6aca8cf0481c6aed071562937a466/${lat},${lng}`)
        .then((response)=>response.json()) // call this function when res is loaded
        // return a Promise with result of above function
        .then(response =>{
          data.icon = response.currently.icon;
          setSkycon(data.icon, setColor, setIcon);
        })

    }

    fetchData();
  });

  return (
    <div>
      <h3>Icon</h3>
      <ReactAnimatedWeather
        icon={icon}
        color={weather.color3}
        size={weather.size}
        animate={weather.animate}
      />
    </div>
  )
}

export default Icon;