import React, {useEffect, useState } from 'react';
import Icon from './Icon';
import './Weather.css';


const Weather = (props) => {
  
     const [currentTemp, setCurrentTemp] = useState('Not Available Yet');
     const [currentSummary, setCurrentSummary] = useState('Not Available Yet');
     const [responseObj, setResponseObj]  = useState('Not Available Yet');
     const{
        lat,
        lng,
     } = props;


     useEffect(() => {
       async function fetchData() {

      // asynchronously load contents of the url
      // return a Promise that resolves when res is loaded
         await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/7bf77670c6eb79e1316f851da/${lat},${lng}`)
        .then((response)=>response.json()) // call this function when res is loaded
        // return a Promise with result of above function
        .then(response =>{setResponseObj(response)
        })
    }

    fetchData();
    console.log(responseObj+"aaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbb")
  });

     return (
      <div className='flexbox-container'>
         <Icon
           lat={lat}
           lng={lng}
           response ={responseObj}/>
         <Icon 
          lat={lat}
          lng={lng}
          response ={responseObj}>
         </Icon>
         <Icon 
          lat={lat}
          lng={lng}
          response ={responseObj}>
         </Icon>
         <Icon 
          lat={lat}
          lng={lng}
          response ={responseObj}>
         </Icon>
         <Icon 
          lat={lat}
          lng={lng}
          response ={responseObj}>
         </Icon>
     </div>
  )
}

export default Weather;