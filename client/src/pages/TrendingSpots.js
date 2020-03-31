import React, {useState, useEffect} from 'react';
import {Row, Col, Jumbotron} from 'react-bootstrap/';
import './TrendingSpots.css';
import Frame from '../components/Frame/Frame';

function TrendingSpots({requestId, city, latitude, longitude}) {
	let curr = new Date();
	let week = [];

	for (let i = 1; i <= 7; i++) {
		let first = curr.getDate() - curr.getDay() + i;
		let day = new Date(curr.setDate(first) - 604800000)
			.toISOString()
			.slice(0, 10);
		week.push(day);
	}
	console.log('week', week);
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
							tag,
							date_retrieved
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
		<div className='wrapper'>
			<div className='mainTitle'> Trending Spots in Bali</div>
			<div
				style={{
					position: 'relative',
					top: '2%',
					display: 'grid',
					gridTemplateColumns: '14% 14% 14% 14% 14%',
					gridGap: '23px',
					paddingBottom: '0',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				{trendingSpots.map((image, idx) => {
					//const city_in_url = citySubscription.search_term.toLowerCase().replace(' ', ''); // triming the city to match the tag
					const image_url = image.image_link;
					const geolocation = image.geolocation;
					const caption = image.caption;
					if (idx < 7) {
						return (
							<div>
								<Frame
									username={caption}
									geolocation={geolocation}
									img={image_url}
									style={{width: '30px'}}
								/>
							</div>
						);
					}
				})}
				<div className='quote'>Daydream. We'll do the rest.</div>
				<div>
					<div className='date'>2020/03/28</div>
					<div className='weekOf'>Week of </div>
				</div>
			</div>
		</div>
	);
}

export default TrendingSpots;
