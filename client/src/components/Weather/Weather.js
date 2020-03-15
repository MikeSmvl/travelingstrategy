import React, {useEffect, useState } from 'react';
import Icon from './Icon';
import './Weather.css';


const Weather = (props) => {
  
     const [currentTemp, setCurrentTemp] = useState('Not Available Yet');
     const [currentSummary, setCurrentSummary] = useState('Not Available Yet');
     const [responseObj, setResponseObj]  = useState('Not Available Yet');
     const [day1, setDay1] = useState('Not Available Yet');
     const [day2, setDay2] = useState('Not Available Yet');
     const [day3, setDay3] = useState('Not Available Yet');
     const [day4, setDay4] = useState('Not Available Yet');
     const [day5, setDay5] = useState('Not Available Yet');
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
  },[]);

  const hold = responseObj
  console.log(hold[0])
     return (
      <div className='flexbox-container'>
         <Icon
           lat={lat}
           lng={lng}
           time ={responseObj[0]}
           response ={responseObj}/>
         <Icon 
          lat={lat}
          lng={lng}
          time ={responseObj[1]}
          response ={responseObj}>
         </Icon>
         <Icon 
          lat={lat}
          lng={lng}
          time ={responseObj[2]}
          response ={responseObj}>
         </Icon>
         <Icon 
          lat={lat}
          lng={lng}
          time ={responseObj[3]}
          response ={responseObj}>
         </Icon>
         <Icon 
          lat={lat}
          lng={lng}
          time ={responseObj[4]}
          response ={responseObj}>
         </Icon>
     </div>
  )
}

export default Weather;