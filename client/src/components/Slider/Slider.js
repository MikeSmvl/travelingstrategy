import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './Slider.css';
import './Button.css';
import imageOne from './pictures/Events.jpg';
import imageTwo from './pictures/Trending.jpg';


const Slider = (props) => {
	const {
		requestId = '',
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
					<div className="content-overlay" />
					<img className="content-image" src={imageOne} alt="slide-img" />
					<div className="content-details fadeIn-bottom">
						<div className="button">
							<Link to={`/events?request_id=${requestId}&latitude=${latitude}&longitude=${longitude}`}>
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
					<div className="content-overlay" />
					<img className="content-image" src={imageTwo} alt="slide-img" />
					<div className="content-details fadeIn-bottom">
						<div className="button">
							<Link to={`/trending_spots?request_id=${requestId}&city=${city}&latitude=${latitude}&longitude=${longitude}`}>
								<span>Trending</span>
							</Link>
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

Slider.propTypes = {
	requestId: PropTypes.string,
	city: PropTypes.string,
	latitude: PropTypes.string,
	longitude: PropTypes.string

};

export default Slider;
