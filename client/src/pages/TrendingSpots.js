import React, {useState, useEffect} from 'react';
import './TrendingSpots.css';
import Frame from '../components/Frame/Frame';

function TrendingSpots({requestId, city, latitude, longitude}) {
	const [trendingSpots, setTrendingSpots] = useState([]);
	const [taggedCity, setTaggedCity] = useState('');
	const [weekDate, setWeekDate] = useState('');

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
					setTaggedCity(res.data.imagesForRequestId[0].tag);
					setWeekDate(res.data.imagesForRequestId[0].date_retrieved);
				});
		}

		fetchData();
	}, [city, requestId]);

	return (
		<div className='wrapper'>
			<div className='mainTitle'> Trending Spots in {taggedCity}</div>
			<div className='CSSgrid'>
				{trendingSpots.map((image, idx) => {
					const image_url = image.image_link;
					const geolocation = image.geolocation;
					const caption = image.caption;
					if (idx < 7) {
						return (
							<div className="instaPhoto">
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
					<div className='weekDate'>{weekDate.replace('/', '-')}</div>
					<div className='weekOf'>Week of </div>
				</div>
			</div>
		</div>
	);
}

export default TrendingSpots;
