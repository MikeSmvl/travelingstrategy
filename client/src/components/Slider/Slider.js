import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom';
import './Slider.css';
import './Button.css'
import image_1 from './pictures/Events.jpg'
import image_2 from './pictures/Trending.jpg'


const ControlledCarousel = (props) => {
  const {
    request_id = '',
    city = '',
    latitude = '',
    longitude
  } = props;

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
                <Link to={`/events?request_id=${request_id}&latitude=${latitude}&longitude=${longitude}`} >
                  <span>Events</span>
                </Link>
                </div>
              </div>
        </div>
        <Carousel.Caption>
          <h3>Go discover special events near you!</h3>
          <p />
        </Carousel.Caption>
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
        <Carousel.Caption>
          <h3>Go visit the most trending spots! </h3>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
};

ControlledCarousel.propTypes = {
	request_id: PropTypes.string,
	latitude: PropTypes.string,
	longitude: PropTypes.string,

};

export default ControlledCarousel;