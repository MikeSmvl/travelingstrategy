import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap/';
import '../App.css';
import { addTrendingSpots } from '../utils/parsingTools';
import basicSearch from '../utils/event';


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
						imagesForTag(tag:"${city}"){
							image_id,
                            image_link,
                            geolocation,
                            cation,
                            tag
						}
					}
					`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.imagesForTag
					&& res.data.imagesForTag.length !== 0
					&& setTrendingSpots(res.data.imagesForTag);
				});
		}

		fetchData();
	}, city);

	basicSearch()
	return (
		<div>
			<div className="parallax">
				<Row className="justify-content-center" style={{ paddingTop: '300px' }}>
					<Row className="justify-content-center">
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
