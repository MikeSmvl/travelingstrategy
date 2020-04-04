import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import './BotSlider.css';

const getBotKnowledge = (knowledgeArray, eventImg) => {
    const items = [];
    knowledgeArray.forEach(knowledge =>{
        var label = knowledge.label;
        var image = knowledge.image;
        var comment = knowledge.comment;
        var wikipedia = knowledge.wikipediaLink;

        if(image===""){
            items.push(
                <Carousel.Item>
                    <div className="content">
                        <div className="content-overlay" />
                            <img className="content-image" src={eventImg} alt="slide-img" />
                            <div className="content-details fadeIn-bottom">
                                <h3>{label}</h3>
                                <div className="bot-text">
                                    <p>{comment}</p>
                                </div>
                            </div>
                    </div>
                    <Carousel.Caption>
                        <a href={`//${wikipedia}`}>
                            <h3 className="wiki-text">Find out more on wikipedia</h3>
                            <p />
                        </a>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        }
        items.push(
            <Carousel.Item>
                <div className="content">
                    <div className="content-overlay" />
                        <img className="content-image" src={image} alt="slide-img" />
                        <div className="content-details fadeIn-bottom">
                            <h3>{label}</h3>
                            <div className="bot-text">
                                <p>{comment}</p>
                            </div>
                        </div>
                </div>
                <Carousel.Caption>
                    <a href={`//${wikipedia}`}>
                        <h3 className="wiki-text">Find out more on wikipedia</h3>
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
        knowledge,
        eventImg
	} = props;

	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
            {getBotKnowledge(knowledge,eventImg)}
		</Carousel>
	);
};

BotSlider.propTypes = {
	knowledge: PropTypes.instanceOf(Array)
};

export default BotSlider;
