import React, {useEffect } from 'react';
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
  color4: 'white',
  size: 50,
  animate: true
};




function Weather(props) {

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
        .then(response =>
          console.log("ello", response));
    }

    fetchData()
  });

  return (
    <div>
      <h3>hello</h3>
      <ReactAnimatedWeather
    icon={weather.icon2}
    //color={weather.color3}
    size={weather.size}
    animate={weather.animate}
  />
    </div>
  )
}

export default Weather;