import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './BotSlider.css';


const BotSlider = (props) => {
	const {
		label = '',
		comment = '',
		image = '',
		wikiLink
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
                        <img className="content-image" src={require('../../../eventsImages/smart-monkey.gif')} alt="slide-img" />
                        <div className="content-details fadeIn-bottom">
                            <div className="button">
                                <a href={`//google.com/`}>
                                    <span>Events</span>
                                </a>
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
                        <img className="content-image" src={require('../../../eventsImages/smart-monkey.gif')} alt="slide-img" />
                        <div className="content-details fadeIn-bottom">
                            <div className="button">
                                <a href={`//google.com/`}>
                                    <span>Events</span>
                                </a>
                            </div>
					    </div>
				    </div>
                    <Carousel.Caption>
                        <h3>Go discover special events near you!</h3>
                        <p />
                    </Carousel.Caption>
			</Carousel.Item>

		</Carousel>
	);
};

BotSlider.propTypes = {
	label: PropTypes.string,
	comment: PropTypes.string,
	image: PropTypes.string,
	wikiLink: PropTypes.string

};

export default BotSlider;
