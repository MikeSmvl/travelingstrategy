import React, {useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import { setSkycon } from '../../utils/weatherIcon';
import Icon from './Icon';


function Weather({
  lat,
  lng
})
  {

  const [currentTemp, setCurrentTemp] = useState('Not Available Yet');
  const [currentSummary, setCurrentSummary] = useState('Not Available Yet');

  useEffect(() => {
     async function fetchData() {

      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
         await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0bd6aca8cf0481c6aed071562937a466/${lat},${lng}`)
        .then((response)=>response.json()) // call this function when res is loaded
        // return a Promise with result of above function
        .then(response =>{
          setCurrentTemp(response.currently.temperature);
          setCurrentSummary(response.currently.summary);
        })

    }

    fetchData();
  });

  return (
    <div>
      <h3>{currentTemp} {currentSummary}</h3>
      <Icon
        lat={lat}
        lng={lng}
      />
    </div>
  )
}

export default Weather;