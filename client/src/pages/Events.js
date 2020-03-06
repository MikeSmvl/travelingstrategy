import React, { useState, useEffect } from 'react';
import { Row, Col,Button, Nav} from 'react-bootstrap/';

import { Card, CardBody} from '../components/Card/Card';
import '../App.css';
import basicSearch from '../utils/eventsAPI';
import addMyEvents from '../utils/eventsTools';

function Events(
    request_id,
	latitude,
	longitude
){
    const [category, setCategory] = useState('');
    const [savedEvents, setSavedEvents] = useState([]);


    const categoryChosen = (event) => {
        const category = event.target.value;
        console.log(category);
    };

    useEffect(() => {
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
                    && res.data.eventsForRequest.length !=0
                    && setSavedEvents(res.data.eventsForRequest);
                console.log(category);
                console.log(res.data.eventsForRequest)
            });
        }

        fetchEvents();
    },
    category,
    savedEvents);
    console.log(category);
    console.log(savedEvents)

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