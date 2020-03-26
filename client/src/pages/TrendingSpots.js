import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap/';
import './TrendingSpots.css';
import Frame from '../components/Frame/Frame';

function TrendingSpots({requestId, city, latitude, longitude}) {
	const [trendingSpots, setTrendingSpots] = useState([]);
	useEffect(() => {
		async function fetchData() {
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
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
				.then(res => res.json())
				.then(res => {
					res.data.imagesForRequestId &&
						res.data.imagesForRequestId.length !== 0 &&
						setTrendingSpots(res.data.imagesForRequestId);
				});
		}

		fetchData();
	}, [city, requestId]);

	return (
		<>
			{trendingSpots.map(image => {
				//const city_in_url = citySubscription.search_term.toLowerCase().replace(' ', ''); // triming the city to match the tag
				const image_url = image.image_link;
				const geolocation = image.geolocation;
				const caption = image.caption;
				return (
					<div>
						<Frame
							username={caption}
							geolocation={geolocation}
							img={image_url}
						/>
					</div>
				);
			})}
		</>
	);
}

export default TrendingSpots;
