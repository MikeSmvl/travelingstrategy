import * as React from 'react';
import {Col} from 'react-bootstrap/';
import { EventCard} from '../components/EventCard/EventCard';
import { Card} from '../components/Card/Card';

/**
 * 
 * These are basically the events for this request in the db
 */
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

/**
 * 
 * In this method with use replace(/"/g, "'") to remove all
 *  the occurences of " because it makes the grapqhl query fail
 */
function addApiEvents(apiEvents, request_id){
    const events = [];
    apiEvents.forEach(event =>{
        var category = event.category.replace(/"/g, "'");
        var title = event.title.replace(/"/g, "'");
        var start = event.start.replace(/"/g, "'");
        var end = event.end.replace(/"/g, "'");
        var description = event.description.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, "'");
        var duration = event.duration
        var address = ''.replace(/"/g, "'");
        var venue_name = ''.replace(/"/g, "'");
        var venue_type = ''.replace(/"/g, "'");
        var labels = getLabels(event);

        if(event.entities.length>0){
            address = event.entities[0].formatted_address.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, "'");
            venue_name = event.entities[0].name.replace(/"/g, "'");
            venue_type = event.entities[0].type.replace(/"/g, "'");
        }

        const event_for_card = [request_id, category,description, duration,start,end, title,labels,address,venue_type,venue_name];
        events.push(
            <EventCard eventArray={event_for_card}>
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

/**
 * There might be multiple labels for an event that's
 * why we need to loop through the array of labels
 */
function getLabels(event){
    var labels = '';
    event.labels.forEach(label =>{
        labels += label+", ";
    })

    labels = labels.slice(0, -2).replace(/"/g, "'");
    return labels;
}

export {addMyEvents,addApiEvents};