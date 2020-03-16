import * as React from 'react';
import EventsCard from '../components/EventsCard/EventsCard';


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
        const duration = event.duration;
        const eventImg = require(`../eventsImages/addedToFavorites.gif`);

		events.push(

            <EventsCard 
                eventCategory={eventCategory}
                description={description}
                startDate={startDate}
                endDate={endDate}
                title={title}
                address={address}
                nameOfPlace={nameOfPlace}
                duration={duration}
                isLiked={true}
                eventImg={eventImg}
            ></EventsCard>
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
function addApiEvents(apiEvents, requestId, images){
    const events = [];
    const imagesUsed = [];
    var count = 0;
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
        const eventImg = getRandomImageForCategory(images,imagesUsed)

        if(event.entities.length>0){
            address = event.entities[0].formatted_address.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, "'");
            nameOfPlace = event.entities[0].name.replace(/"/g, "'");
            venueType = event.entities[0].type.replace(/"/g, "'");
        }

        const eventInfo = [requestId, category,description, duration,startDate,endDate, title,labels,address,venueType,nameOfPlace];
        events.push(
            <EventsCard
                eventCategory={category}
                description={description}
                startDate={startDate}
                endDate={endDate}
                title={title}
                address={address}
                nameOfPlace={nameOfPlace}
                duration={duration}
                isLiked={false}
                eventInfo={eventInfo}
                eventImg={eventImg}
            ></EventsCard>
        );
        count++;
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

function getRandomImageForCategory(images,imagesUsed){
    var imageLink='https://us.anteagroup.com/sites/default/files/styles/width1520/public/ag03435.jpg?itok=ZnIIrWqo'//default image
    do{
        var randomNumber = Math.floor((Math.random() * images.length) + 0);
        if(images.length >0){
            imageLink = images[randomNumber].urls.full+"w=600&h=400";
        }
    }while (imagesUsed.includes(imageLink)) //Making sure we don't have repeated images
    imagesUsed.push(imageLink);

    return imageLink
}

export {addMyEvents,addApiEvents};