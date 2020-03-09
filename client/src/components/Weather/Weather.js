import React, {useEffect } from 'react';

const Weather = (props) => {
  const {
    request_id = '',
    city = '',
    lat = '',
    lon = '',
  } = props;

  // const[weather, setWeather] = useState('Not available yet');

  useEffect(() => {
    async function fetchData() {
      try{
      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
      fetch('http://api.openweathermap.org/data/2.5/weather?lat=40.7127753&lon=-74.0059728&appid=d6c4b004f1817f813610a2328f14891c')
        .then((response)=>response.json()) // call this function when res is loaded
        // return a Promise with result of above function
        .then(response =>
          console.log("ello", response));
      } catch (error) {
        console.log(error);
      }


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