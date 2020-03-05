import React from "react";
import './Slider.css';

//function to display the images to the component dynamically
function ImageComp({src}) {

  let imageStyle = {
    width: 100 + "%",
    height: "auto"
  }
  return <img src={src} alt="slide-img" style={imageStyle} />;
}

export default ImageComp