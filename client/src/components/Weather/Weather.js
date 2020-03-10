import React, {useEffect } from 'react';

function Weather() {


  // const[weather, setWeather] = useState('Not available yet');

  useEffect(() => {
    async function fetchData() {
      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
      await fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0bd6aca8cf0481c6aed071562937a466/37.8267,-122.4233')
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
    </div>
  )
}

export default Weather;