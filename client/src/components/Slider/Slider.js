import React from 'react';
import './Slider.css';

function Slider() {
  //array to show the components for the Slider
  let slideArray =  [1,2,3]
  return(
    <div className="slider">
      {
        slideArray.map((item, index)=>{
          return(
            <div key={index} className="slide">
              {item}
            </div>
          )
        })
      }

    {/* button to navigate left or right */}
    <button id="leftButton">left</button>
    <button id="rightButton">right</button>
    </div>
  )
}

export default Slider;