import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap/';

import { Card, CardBody} from '../components/Card/Card';
import '../App.css';
import basicSearch from '../utils/eventsAPI';

function Events(){
    // basicSearch()
    return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{ paddingTop: '300px' }}>
					<Row className="justify-content-center">
                        Concerts
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
                                    borderRadius: '0px',
                                    paddingBottom:'1.25rem'
                                }}
                                className="justify-content-center"
                            >
                            <Card
                                style={{
                                    width: '385px',
                                    height: '255px'
                                }}
                            >
                                <CardBody
                                    style={{
                                        padding: '0px',
                                        height: '100%'
                                }}
                                >
                                        <img 
                                        src={"https://instagram.fymy1-1.fna.fbcdn.net/v/t51.2885-15/e35/85184821_632347440640224_1314255881925028536_n.jpg?_nc_ht=instagram.fymy1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=kjDAXn1sGwAAX-2bv7b&oh=8555b63271980d7bebf7598f6e826be1&oe=5EFA3353"} 
                                        alt="Logo" 
                                        width='100%'
                                        height='100%'/>
                                        <div>
                                            <b>Geo-location: </b>
                                            <br></br>
                                            <br></br>
                                        </div>
                                </CardBody>
                            </Card>
                            </Row>
						</Col>
					</Row>
				</Row>
				<footer id="footer" />
			</div>
		</div>
	);
}

export default Events;