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
		event_array,
		...rest 
	} = props;

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		addEvent();
	};


	async function addEvent() {
		await fetch('http://localhost:4000/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/graphql' },
			body: `mutation{
					addEvents(request_id:"${event_array[0]}", event_category:"${event_array[1]}", description:"${event_array[2]}", duration:"${event_array[3]}", start_date:"${event_array[4]}", end_date:"${event_array[5]}", title:"${event_array[6]}", labels:"${event_array[7]}", address:"${event_array[8]}", place_type:"${event_array[9]}", name_of_place:"${event_array[10]}")
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
		})
	}
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
	classExtra: PropTypes.string,
	event_array: PropTypes.array
};

export { EventCard, Divider };
