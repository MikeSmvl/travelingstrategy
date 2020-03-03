import React, { useState, useEffect } from 'react';
import { Row, Col,Button } from 'react-bootstrap/';
import '../App.css';
import { addTrendingSpots } from '../utils/parsingTools';
import basicSearch from '../utils/eventsAPI';

import { Link } from 'react-router-dom';


function TrendingSpots({
	city
}) {
	const [trendingSpots, setTrendingSpots] = useState([]);
	useEffect(() => {
		async function fetchData() {
			await fetch('http://localhost:4000/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						imagesForRequestId(request_id:"${city}"){
							image_id,
                            image_link,
                            geolocation,
                            caption,
							tag

						}
					}
					`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.imagesForRequestId
					&& res.data.imagesForRequestId.length !== 0
					&& setTrendingSpots(res.data.imagesForRequestId);
				});
		}

		fetchData();
	}, city);

	return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{ paddingTop: '300px' }}>
					<Row className="justify-content-center">
						<Link
							to={`/events?city=${city}`}
						>
							<Button>To Events</Button>
						</Link>
						<Col
							style={{
								backgroundColor: 'rgb(255, 255, 255)',
								borderRadius: '20px'
							}}
							lg={8}
						>
							{addTrendingSpots(trendingSpots)}
						</Col>
					</Row>
				</Row>
				<footer id="footer" />
			</div>
		</div>
	);
}

export default TrendingSpots;
