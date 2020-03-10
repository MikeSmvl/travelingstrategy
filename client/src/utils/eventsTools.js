import * as React from 'react';
import {Col} from 'react-bootstrap/';
import { EventCard} from '../components/EventCard/EventCard';
import { Card} from '../components/Card/Card';


function addMyEvents(myEvents){
    const events = [];
	myEvents.forEach(event =>{
		const event_category = event.event_category;
        const description = event.description;
		const start_date = event.start_date;
        const end_date = event.end_date;
        const title = event.title;
        const address = event.address;
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

function addApiEvents(apiEvents, request_id){
    const events = [];
    apiEvents.forEach(event =>{
        var category = event.category;
        var title = event.title;
        var start = event.start;
        var end = event.end;
        var description = event.description;
        var duration = event.duration;
        var address = '';
        var venue_name = '';
        var venue_type = '';
        var labels = getLabels(event);

        if(event.entities.length>0){
            address = event.entities[0].formatted_address;
            venue_name = event.entities[0].name;
            venue_type = event.entities[0].type;
        }

        const event_for_card = [request_id, category,description, duration,start,end, title,labels,address,venue_type,venue_name];
        console.log(event_for_card)
        events.push(
            <EventCard event_array={event_for_card}>
                <hr></hr>
                Category:{category}<br></br>
                Title: {title}<br></br>
                Start Date: {start}<br></br>
                End Date: {end}<br></br>
                Description: {description}<br></br>
                Address: {address}<br></br>
                Venue: {venue_name}<br></br>
            </EventCard>
        );
    });

    return (
        <div>
            <Card
                header= {"Suggested Events"}
                style={{ maxHeight: '400px', overflow: 'scroll', padding: '40px 25px 25px 25px' }}
            >
                {events}
            </Card>
        </div>
    );
}

function getLabels(event){
    var labels = '';
    event.labels.forEach(label =>{
        labels += label+", ";
    })

    labels = labels.slice(0, -2);
    return labels;
}

export {addMyEvents,addApiEvents};