import React from "react";
import './Slider.css';

//function to display the images to the component dynamically
function ImageComp({src}) {

  const imageStyle = {
    width: 100 + "%",
    height: "auto"
  }
  return(
    <div className="content">
      <div className="content-overlay"></div>
        <img className="content-image" src={src} alt="slide-img" style={imageStyle} />
          <div className="content-details fadeIn-bottom">
            <h3 className="content-title">This is a title</h3>
          </div>
    </div>

  )
}

export default ImageComp