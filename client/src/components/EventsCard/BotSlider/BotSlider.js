import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import './BotSlider.css';

const getBotKnowledge = (knowledgeArray) => {
    const items = [];
    knowledgeArray.forEach(knowledge =>{
        var label = knowledge.label;
        var image = knowledge.image;
        var comment = knowledge.comment;
        var wikipedia = knowledge.wikipediaLink;

        items.push(
            <Carousel.Item>
				<div className="content">
				    <div className="content-overlay" />
                        <img className="content-image" src={image} alt="slide-img" />
                        <div className="content-details fadeIn-bottom">
                            <div className="button">
                                <span>{label}</span>
                                <span>{comment}</span>
                            </div>
                        </div>
				</div>
                <Carousel.Caption>
                    <a href={`//${wikipedia}`}>
                        <h3>Find out more on wikipedia</h3>
                        <p />
                    </a>
                </Carousel.Caption>
			</Carousel.Item>
        )
    });

    return (items);
}

const BotSlider = (props) => {
	const {
		knowledge
	} = props;

	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState(null);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
		setDirection(e.direction);
	};

	return (
		<Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
            {getBotKnowledge(knowledge)}
		</Carousel>
	);
};

BotSlider.propTypes = {
	knowledge: PropTypes.instanceOf(Array)
};

export default BotSlider;
