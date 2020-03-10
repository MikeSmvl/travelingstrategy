import * as React from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard, Button } from 'react-bootstrap';
import './EventCard.css';


const handleSubmit = (event) => {
	console.log("ahahahahahahahah");
	addEvent();
};


async function addEvent() {
	const aaa = `hello`
	await fetch('http://localhost:4000/graphql', {
		method: 'POST',
		headers: { 'Content-Type': 'application/graphql' },
		body: `mutation{
				addEvents(request_id:"${aaa}", event_category:"${aaa}", description:"${aaa}", duration:"${aaa}", start_date:"${aaa}", end_date:"${aaa}", title:"${aaa}", labels:"${aaa}", address:"${aaa}", place_type:"${aaa}", name_of_place:"${aaa}")
				{   request_id,
					event_category,
					description,
					duration,
					start_date,
					end_date,
					title,
					labels,
					address,
					place_type,
					name_of_place
				} 
			}`
	});
}



const EventCard = (props) => {
	const { children, title = '', subtitle = '', classExtra = '', ...rest } = props;
	return (
		<RBCard.Body
			{...rest}
			className={`TScardBody ${classExtra}`}
		>
			<Button value="Add to Favorite" style={{float: 'left'}} onClick={handleSubmit}>Add to Favorite</Button>

			{title && <RBCard.Title>{title}</RBCard.Title>}
			{subtitle && (
				<RBCard.Subtitle className="mb-2 text-muted">
					{subtitle}
				</RBCard.Subtitle>
			)}
			<span className="card-text">{children}</span>
		</RBCard.Body>
	);
};

const Divider = () => {
	return <hr className="cardDivider" />;
};

EventCard.propTypes = {
	header: PropTypes.string,
	footer: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	classExtra: PropTypes.string
};

export { EventCard, Divider };
