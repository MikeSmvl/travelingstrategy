import * as React from 'react';
import EventsCard from '../components/EventsCard/EventsCard';
import {Row, Col} from 'react-bootstrap/';



/**
 * 
 * These are basically the events for this request in the db
 */
function addMyEvents(myEvents){
    spotlightCall("Real madrid")
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
        const eventImg = event.image;

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
    const apiImages = images;
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
        const eventImg = getRandomImageForCategory(apiImages,imagesUsed)

        if(event.entities.length>0){
            address = event.entities[0].formatted_address.replace(/(\r\n|\n|\r)/gm, " ").replace(/"/g, "'");
            nameOfPlace = event.entities[0].name.replace(/"/g, "'");
            venueType = event.entities[0].type.replace(/"/g, "'");
        }

        const eventInfo = [requestId, category,description, duration,
                            startDate,endDate, title,labels,address,venueType,
                            nameOfPlace,eventImg];
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
    });

    return (
        <div>
            {events}
        </div>
    );
}

function getButtonContent(category){
    return(
        <Row>
            {category==='Hamburger'
            ? <Col xs={12} md={8} >
               <img alt="Hamburger" src={require(`../eventsImages/Hamburger-Icon.png`)} style={{height:'3em'}}></img>
            </Col>
            :
            <Col xs={12} md={8}>
               {category}
            </Col>}
            <Col xs={6} md={4} style={{textAlign:'end'}}>
                <img alt="Icon" src={require(`../eventsImages/${category}.png`)} style={{height:'2em'}}></img>
            </Col>
        </Row>
    )
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
    var imageLink='https://source.unsplash.com/user/_vickyreyes/600x400'//default image
    do{
        var randomNumber = Math.floor((Math.random() * images.length) + 0);
        if(images.length >0){
            imageLink = images[randomNumber].urls.full+"w=600&h=400";
        }
    }while (imagesUsed.includes(imageLink)) //Making sure we don't have repeated images
    imagesUsed.push(imageLink);

    return imageLink
}



export {addMyEvents,addApiEvents,getButtonContent};