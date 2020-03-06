import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom';
import './Slider.css';
import './Button.css'
import image_1 from './pictures/Events.jpg'
import image_2 from './pictures/Trending.jpg'


function ControlledCarousel({
	request_id,
	city,
	latitude,
	longitude
  }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [trendingSpots, setTrendingSpots] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  useEffect(() => {
		async function fetchData() {
			await fetch('http://localhost:4000/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						imagesForRequestId(request_id:"${city}"){
							image_id,
                            image_link,
                            geolocation,
                            caption,
							tag

						}
					}
					`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.imagesForRequestId
					&& res.data.imagesForRequestId.length !== 0
					&& setTrendingSpots(res.data.imagesForRequestId);
				});
		}

		fetchData();
	}, city);

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
}

export default ControlledCarousel;