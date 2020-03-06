import React,{useState} from 'react';
import './Slider.css';
import './Button.css'
import image_1 from './pictures/Events.jpg'
import image_2 from './pictures/Trending.jpg'
import Carousel from 'react-bootstrap/Carousel'


function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
          <div className="content">
          <div className="content-overlay"></div>
            <img className="content-image" src={image_1} alt="slide-img" />
              <div className="content-details fadeIn-bottom">
                <div className="button">
                  <span>Events</span>
                </div>
              </div>
        </div>
        <Carousel.Caption />
      </Carousel.Item>

      <Carousel.Item>
          <div className="content">
          <div className="content-overlay"></div>
            <img className="content-image" src={image_2} alt="slide-img" />
              <div className="content-details fadeIn-bottom">
                <div className="button">
                  <span>Trending</span>
                </div>
              </div>
        </div>
        <Carousel.Caption />
      </Carousel.Item>

    </Carousel>
  );
}

export default ControlledCarousel;