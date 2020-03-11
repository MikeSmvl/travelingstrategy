import * as React from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard, Button } from 'react-bootstrap';
import './EventCard.css';

const EventCard = (props) => {
	const {
		children,
		title = '',
		subtitle = '',
		classExtra = '',
		eventArray,
		...rest
	} = props;


	async function addEvent() {
		await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/graphql' },
			body: `mutation{
					addEvents(request_id:"${eventArray[0]}", event_category:"${eventArray[1]}", description:"${eventArray[2]}", duration:"${eventArray[3]}", start_date:"${eventArray[4]}", end_date:"${eventArray[5]}", title:"${eventArray[6]}", labels:"${eventArray[7]}", address:"${eventArray[8]}", place_type:"${eventArray[9]}", name_of_place:"${eventArray[10]}")
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

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		addEvent();
	};

	return (
		<RBCard.Body
			{...rest}
			className={`TScardBody ${classExtra}`}
		>
			<Button value="Add to Favorite" style={{ float: 'left' }} onClick={handleSubmit}>Add to Favorite</Button>

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
	classExtra: PropTypes.string,
	eventArray: PropTypes.instanceOf(Array)
};

export { EventCard, Divider };
