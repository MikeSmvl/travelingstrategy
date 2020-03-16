import React, {useEffect, useState } from 'react';
import Icon from './Icon';
import './Weather.css';


const Weather = (props) => {
  
     const [responseObj, setResponseObj]  = useState('Not Available Yet');
     const{
        lat,
        lng,
     } = props;


     useEffect(() => {
       async function fetchData() {

      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
         await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0bd6aca8cf0481c6aed071562937a466/${lat},${lng}`)
        .then((response)=>response.json()) // call this function when res is loaded
        // return a Promise with result of above function
        .then(response =>{setResponseObj(response.daily.data)})
    }

    fetchData();
    console.log(responseObj)
  },[]);

     return (
      <div className='flexbox-container'>
         <Icon
           lat={lat}
           lng={lng}
           weekday ={responseObj[0]}
           />
         <Icon 
          lat={lat}
          lng={lng}
          weekday ={responseObj[1]}
          />
         <Icon 
          lat={lat}
          lng={lng}
          weekday ={responseObj[2]}
          />
         <Icon 
          lat={lat}
          lng={lng}
          weekday ={responseObj[3]}
          />
         <Icon 
          lat={lat}
          lng={lng}
          weekday ={responseObj[4]}
          />
     </div>
  )
}

export default Weather;