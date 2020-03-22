import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap/';
import './TrendingSpots.css';
import { addTrendingSpots } from '../utils/parsingTools';


function TrendingSpots({
	requestId,
	city,
	latitude,
	longitude
}) {
	const [trendingSpots, setTrendingSpots] = useState([]);
	useEffect(() => {
		async function fetchData() {
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						imagesForRequestId(request_id:"${requestId}"){
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
	}, [city, requestId]);

	return (
		<>
			{addTrendingSpots(trendingSpots)}
		</>
	);
}

export default TrendingSpots;
