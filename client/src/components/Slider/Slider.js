import React,{useState} from 'react';
import './Slider.css';
import ImageComp from './ImageComp'
import image_1 from './pictures/Events.jpg'
import image_2 from './pictures/Trending.jpg'

function Slider() {
  //array to show the components for the Slider
  let slideArray =  [<ImageComp src={image_1} />, <ImageComp src={image_2} />]
  const [x, setX] = useState(0)
  //functionality for the buttons
  const goLeft=()=> {
    //if x is equal to the first component, clicking left will set set the slider back to the last component
    //otherwise keep sliding to the left
    x === 0 ? setX(-100 * (slideArray.length -1)) : setX(x + 100)
  }

  const goRight=()=> {
    //if x is equal to the length of the array, clicking right will set the slider back to the first component
    //otherwise keep sliding to the right
    x === -100 * (slideArray.length -1) ? setX(0) : setX(x - 100)
  }

  return(
    <div className="slider">
      {
        slideArray.map((item, index)=>{
          return(
            <div key={index} className="slide" style={{transform:`translateX(${x}%)`}}>
              {item}
            </div>
          )
        })
      }
    {/* button to navigate left or right */}
    <button id="leftButton" onClick={goLeft}>
      <i class="fas fa-chevron-left"></i>
    </button>
    <button id="rightButton" onClick={goRight}>
      <i class="fas fa-chevron-right"></i>
    </button>
    </div>
  )
}

export default Slider;