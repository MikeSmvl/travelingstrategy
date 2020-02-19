import React, { useState, useEffect } from 'react';
import { Row, Col} from 'react-bootstrap/';

import { Card, CardBody} from '../components/Card/Card';

import "../App.css";


function TrendingSpots({
    city
}) {

    console.log(city)
	return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{paddingTop: '300px'}}>
					<Row className="justify-content-center">
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
                                className="justify-content-center"
                            >
                            <Card
                                style={{
                                    width: '385px',
                                    height: '255px'
                                }}
                            >
                                <CardBody
                                    classExtra="chosen-cities">
                                        Hello
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

export default TrendingSpots;
