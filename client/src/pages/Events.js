import React, { useState, useEffect } from 'react';
import { Row, Col,Button} from 'react-bootstrap/';

import { Card, CardBody} from '../components/Card/Card';
import '../App.css';
import basicSearch from '../utils/eventsAPI';

function Events(
	latitude,
	longitude
){
    const [category, setCategory] = useState('');


    const categoryChosen = (event) => {
        const category = event.target.value;
        console.log(category);
    };

    console.log(category);

    // basicSearch()
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
                        <div className="justify-content-center" style={{ paddingLeft: '12%'}}>
                            <Button variant="outline-primary" value="conferences" onClick={categoryChosen}>Conferences</Button>
                            <Button variant="outline-primary" value="expos" onClick={categoryChosen}>Expos</Button>
                            <Button variant="outline-primary" value="concerts" onClick={categoryChosen}>Concerts</Button>
                            <Button variant="outline-primary" value="festivals" onClick={categoryChosen}>Festivals</Button>
                            <Button variant="outline-primary" value="performing-arts" onClick={categoryChosen}>Performing-arts</Button>
                            <Button variant="outline-primary" value="sports" onClick={categoryChosen}>Sports</Button>
                            <Button variant="outline-primary" value="community" onClick={categoryChosen}>Community</Button>
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