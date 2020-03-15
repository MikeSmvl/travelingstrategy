import * as React from 'react';
import { EventCard} from '../components/EventCard/EventCard';
import { Card, CardBody } from '../components/Card/Card';
import TestCard from '../components/TestCard/TestCard';




/**
 * 
 * These are basically the events for this request in the db
 */
function addMyEvents(myEvents){
    const events = [];
	myEvents.forEach(event =>{
		const eventCategory = event.event_category;
        const description = event.description;
		const startDate = event.start_date;
        const endDate = event.end_date;
        const title = event.title;
        const address = event.address;
        const nameOfPlace = event.name_of_place;
        const duration = event.duration
		events.push(

            <TestCard 
                eventCategory={eventCategory}
                description={description}
                startDate={startDate}
                endDate={endDate}
                title={title}
                address={address}
                nameOfPlace={nameOfPlace}
                duration={duration}
                isLiked={true}

            ></TestCard>
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
function addApiEvents(apiEvents, requestId){
    const events = [];
    apiEvents.forEach(event =>{
        var category = event.category.replace(/"/g, "'");
        var title = event.title.replace(/"/g, "'");
        var startDate = event.start.replace(/"/g, "'");
        var endDate = event.end.replace(/"/g, "'");
        var description = event.description.replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, "'");
        var duration = event.duration
        var address = ''.replace(/"/g, "'");
        var nameOfPlace = ''.replace(/"/g, "'");
        var venueType = ''.replace(/"/g, "'");
        var labels = getLabels(event);

        if(event.entities.length>0){
            address = event.entities[0].formatted_address.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, "'");
            nameOfPlace = event.entities[0].name.replace(/"/g, "'");
            venueType = event.entities[0].type.replace(/"/g, "'");
        }

        const event_for_card = [requestId, category,description, duration,startDate,endDate, title,labels,address,venueType,nameOfPlace];
        events.push(
            <TestCard 
                eventCategory={category}
                description={description}
                startDate={startDate}
                endDate={endDate}
                title={title}
                address={address}
                nameOfPlace={nameOfPlace}
                duration={duration}
                isLiked={false}

            ></TestCard>
            // <Card
            //     header="Events"
            //     style={{ maxHeight: '400px', overflow: 'scroll', padding: '40px 25px 25px 25px', textAlign: 'center' }}
            // >
            //     <CardBody>
            //         <EventCard eventArray={event_for_card}>
            //             <hr></hr>
            //             Category:{category}<br></br>
            //             Title: {title}<br></br>
            //             Start Date: {start}<br></br>
            //             End Date: {end}<br></br>
            //             Description: {description}<br></br>
            //             Address: {address}<br></br>
            //             Venue: {venue_name}<br></br>
            //         </EventCard>
            //     </CardBody>
            // </Card>
            
        );
    });

    return (
        <div>
            {events}
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