import React, {useEffect } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';


const defaults = {
  icon: 'CLEAR_DAY',
  color: 'goldenrod',
  size: 512,
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
    icon={defaults.icon}
    color={defaults.color}
    size={defaults.size}
    animate={defaults.animate}
  />
    </div>
  )
}

export default Weather;