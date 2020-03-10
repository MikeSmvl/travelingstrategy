import React, { useState, useEffect } from 'react';
import { Row, Col,Button, Nav} from 'react-bootstrap/';
import { Card, CardBody} from '../components/Card/Card';
import '../App.css';
import {addMyEvents, addApiEvents} from '../utils/eventsTools';
import Client from 'predicthq';
const client = new Client({access_token: '3ezKmlrAYq3QMDt3d-wZh2q-oBVt57U0c_CfJiax'});
const phqEvents = client.events;



function Events({
    request_id,
	latitude,
	longitude
}){
    const [category, setCategory] = useState('');
    const [savedEvents, setSavedEvents] = useState([]);
    const [eventsForCategories, setEventsForCategories] = useState([]);
    const [conferences, setConferences] = useState([]);
    const [expos, setExpos] = useState([]);
    const [concerts, seConcerts] = useState([]);
    const [festivals, setFestivals] = useState([]);
    const [performingArts, setPerformingArts] = useState([]);
    const [sports, setSports] = useState([]);
    const [community, setCommunity] = useState([]);
    const [conferencesCalled, setConferencesCalled] = useState(false);
    const [exposCalled, setExposCalled] = useState(false);
    const [concertsCalled, setConcertsCalled] = useState(false);
    const [festivalsCalled, setFestivalsCalled] = useState(false);
    const [performingArtsCalled, setPerformingArtsCalled] = useState(false);
    const [sportsCalled, setSportsCalled] = useState(false);
    const [communityCalled, setCommunityCalled] = useState(false);




    const categoryChosen = (event) => {
        setCategory(event.target.value)
    };

    useEffect(() => {

        // Basic event search using category as parameter. By default, it will return the first ten events.
        async function searchByCategory(category){
            console.log("called")
            const withinParam = `${latitude},${longitude}`;
            let searchResults = await phqEvents.search({
                "location_around.origin": withinParam,
                "category":category
            });
            return searchResults.result.results
        }
        /**
         * This function checks if the events for a category were already requested
         * in order to provide faster service and limit api calls
         **/
        async function eventsByCategoryToDispaly(){
            var array_of_events = [];
            switch(category) {
                case "conferences":
                    if(!conferencesCalled){
                        array_of_events = await searchByCategory(category)
                        setConferences(array_of_events);
                    }
                    else{
                        array_of_events = conferences;
                    }
                    setConferencesCalled(true)
                break;
                case "expos":
                    if(!exposCalled){
                        array_of_events = await searchByCategory(category)
                        setExpos(array_of_events)
                    }
                    else{
                        array_of_events = expos;
                    }
                    setExposCalled(true)
                break;
                case "concerts":
                    if(!concertsCalled){
                        array_of_events = await searchByCategory(category)
                        seConcerts(array_of_events)
                    }
                    else{
                        array_of_events = concerts;
                    }
                    setConcertsCalled(true)
                break;
                case "festivals":
                    if(!festivalsCalled){
                        array_of_events = await searchByCategory(category)
                        setFestivals(array_of_events)
                    }
                    else{
                        array_of_events = festivals;
                    }
                    setFestivalsCalled(true)
                break;
                case "performing-arts":
                    if(!performingArtsCalled){
                        array_of_events = await searchByCategory(category)
                        setPerformingArts(array_of_events)
                    }
                    else{
                        array_of_events = performingArts;
                    }
                    setPerformingArtsCalled(true)
                break;
                case "sports":
                    if(!sportsCalled){
                        array_of_events = await searchByCategory(category)
                        setSports(array_of_events)
                    }
                    else{
                        array_of_events = sports;
                    }
                    setSportsCalled(true)
                break;
                case "community":
                    if(!communityCalled){
                        array_of_events = await searchByCategory(category)
                        setCommunity(array_of_events)
                    }
                    else{
                        array_of_events = community;
                    }
                    setCommunityCalled(true)
                break;
                default:
                ;
              }
              return array_of_events;
        }

        async function fetchEvents() {
            await fetch(process.env.REACT_APP_BACKEND, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
                    query:`{
                        eventsForRequest(request_id:"5"){
                            request_id,
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
                    }
                    `
                })
            })
            .then((res) => res.json())
            .then((res) => {
                res.data.eventsForRequest
                    && res.data.eventsForRequest.length !==0
                    && setSavedEvents(res.data.eventsForRequest);
            });
        }

        async function setEventsToDisplay(){
            var events_by_category = await eventsByCategoryToDispaly()
            setEventsForCategories(events_by_category)
        }

        fetchEvents();
        setEventsToDisplay();
    },
    [
        category,
        conferences,
        expos,
        concerts,
        festivals,
        performingArts,
        sports,
        community,
        conferencesCalled,
        exposCalled,
        concertsCalled,
        festivalsCalled,
        performingArtsCalled,
        sportsCalled,
        communityCalled,
        latitude,
        longitude

    ]);


    return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{ paddingTop: '100px' }}>
                    <Col
                        style={{
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderRadius: '20px'
                        }}
                        lg={8}
                    >
                        <Row
								style={{
									backgroundColor: 'rgb(247,	247,	247)',
									padding: '0.5em',
									borderRadius: '0px'
								}}
								className="justify-content-center sticky"
							>
								<Nav variant="pills" className="flex-row">
									<Nav.Item>
                                        <Button variant="outline-primary" value="conferences" onClick={categoryChosen}>Conferences</Button>
									</Nav.Item>
									<Nav.Item>
                                        <Button variant="outline-primary" value="expos" onClick={categoryChosen}>Expos</Button>
									</Nav.Item>
									<Nav.Item>
                                        <Button variant="outline-primary" value="concerts" onClick={categoryChosen}>Concerts</Button>
									</Nav.Item>
									<Nav.Item>
                                        <Button variant="outline-primary" value="festivals" onClick={categoryChosen}>Festivals</Button>
									</Nav.Item>
									<Nav.Item>
                                        <Button variant="outline-primary" value="performing-arts" onClick={categoryChosen}>Performing-arts</Button>
									</Nav.Item>
									<Nav.Item>
                                        <Button variant="outline-primary" value="sports" onClick={categoryChosen}>Sports</Button>
									</Nav.Item>
									<Nav.Item>
                                        <Button variant="outline-primary" value="community" onClick={categoryChosen}>Community</Button>
									</Nav.Item>
								</Nav>
							</Row>
                        <div className="justify-content-center">
                            <div id="My_Events" style={{ padding: '40px 25px 25px 25px' }}>
                                <div>
                                    <ul>
                                        {addApiEvents(eventsForCategories,request_id)}
                                    </ul>
                                    <ul>
                                        <Card
                                            header="Favorite Events"
                                            style={{ maxHeight: '400px', overflow: 'scroll', padding: '40px 25px 25px 25px', textAlign: 'center'}}
                                        >
                                            <CardBody>
                                            {addMyEvents(savedEvents)}
                                            </CardBody>
                                        </Card>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
				</Row>
				<footer id="footer" />
			</div>
		</div>
	);
}

export default Events;