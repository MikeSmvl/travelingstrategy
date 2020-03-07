import React, { useState, useEffect, useRef } from 'react';
import { Row, Col,Button, Nav} from 'react-bootstrap/';
import '../App.css';
import searchByCategory from '../utils/eventsAPI';
import addMyEvents from '../utils/eventsTools';
import { Card, CardBody} from '../components/Card/Card';

function Events(
    request_id,
	latitude,
	longitude
){
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

    // var conferencesCalled =useRef(false);
    var exposCalled =useRef(false);
    var concertsCalled =useRef(false);
    var festivalsCalled =useRef(false);
    var performingArtsCalled =useRef(false);
    var sportsCalled =useRef(false);
    var communityCalled =useRef(false);


    const categoryChosen = (event) => {
        setCategory(event.target.value)
    };

    useEffect(() => {


        /**
         * This function checks if the events for a category were already requested
         * in order to provide faster service and limit api calls
         **/
        async function eventsByCategoryToDispaly(){
            var array_of_events = [];
            switch(category) {
                case "conferences":
                    console.log(conferencesCalled)
                    if(!conferencesCalled){
                        array_of_events = searchByCategory(category);
                        setConferences(array_of_events);
                    }
                    else{
                        array_of_events = conferences;
                    }
                    setConferencesCalled(true)
                break;
                case "expos":
                    if(!exposCalled.current){
                        array_of_events = searchByCategory(category)
                        setExpos(array_of_events)
                    }
                    else{
                        array_of_events = expos;
                    }
                    exposCalled = true
                break;
                case "concerts":
                    if(!concertsCalled.current){
                        array_of_events = searchByCategory(category)
                        seConcerts(array_of_events)
                    }
                    else{
                        array_of_events = concerts;
                    }
                    concertsCalled = true
                break;
                case "festivals":
                    if(!festivalsCalled.current){
                        array_of_events = searchByCategory(category)
                        setFestivals(array_of_events)
                    }
                    else{
                        array_of_events = festivals;
                    }
                    festivalsCalled = true
                break;
                case "performing-arts":
                    if(!performingArtsCalled.current){
                        array_of_events = searchByCategory(category)
                        setPerformingArts(array_of_events)
                    }
                    else{
                        array_of_events = performingArts;
                    }
                    performingArtsCalled = true
                break;
                case "sports":
                    if(!sportsCalled.current){
                        array_of_events = searchByCategory(category)
                        setSports(array_of_events)
                    }
                    else{
                        array_of_events = sports;
                    }
                    sportsCalled = true
                break;
                case "community":
                    if(!communityCalled.current){
                        array_of_events = searchByCategory(category)
                        setCommunity(array_of_events)
                    }
                    else{
                        array_of_events = community;
                    }
                    communityCalled = true
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
                console.log(category);
                console.log(res.data.eventsForRequest)
            });
        }


        fetchEvents();

        var events_by_category = eventsByCategoryToDispaly()
        setEventsForCategories(events_by_category)
    },
    [
        category,
        conferencesCalled

    ]);

    console.log("Category: ",category)
    console.log("Events",eventsForCategories )

    return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{ paddingTop: '300px' }}>
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
                            <div id="My_Events">
                                {/* <Row className="justify-content-center"
                                    style={{
                                        backgroundColor: 'rgb(253, 218, 197)'
                                    }}
                                 >
                                    {/* <Col sm={5} style={{ padding: '40px 25px 25px 25px' }}>
                                        Text
                                    </Col> 
                                    
                                </Row> */}
                                <Card
                                            header="Events"
                                            
                                        >
                                            <CardBody>
                                                {addMyEvents(savedEvents)}	
                                            </CardBody>
                                    </Card>
                            </div>
                        </div>
                        {/* <Row
                            style={{
                                backgroundColor: 'rgb(247,	247,	247)',
                                borderRadius: '0px',
                                paddingBottom:'1.25rem'
                            }}
                            className="justify-content-center"
                        >
                        </Row> */}
                    </Col>
				</Row>
				<footer id="footer" />
			</div>
		</div>
	);
}

export default Events;