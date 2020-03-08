import * as React from 'react';
import {Col, Button} from 'react-bootstrap/';
import { Card, CardBody} from '../components/Card/Card';

function addMyEvents(myEvents){
    const events = [];
	// console.log(arrayOfImages)
	myEvents.forEach(event =>{
		//const city_in_url = citySubscription.search_term.toLowerCase().replace(' ', ''); // triming the city to match the tag
		// const request_id = event.request_id;
		const event_category = event.event_category;
        const description = event.description;
        // const duration = event.duration;
		const start_date = event.start_date;
        const end_date = event.end_date;
        const title = event.title;
		// const labels = event.labels;
        const address = event.address;
        // const place_type = event.place_type;
		const name_of_place = event.name_of_place;
		events.push(
            <Col style={
                { 
                    padding: '40px 25px 25px 25px'
                }
            }>
                <hr></hr>
                Category:{event_category}<br></br>
                Title: {title}<br></br>
                Start Date: {start_date}<br></br>
                End Date: {end_date}<br></br>
                Description: {description}<br></br>
                Address: {address}<br></br>
                Venue: {name_of_place}<br></br>
            </Col>
		);
	});
	return (
		<div>
			{events}
		</div>
	);
}

export default addMyEvents;