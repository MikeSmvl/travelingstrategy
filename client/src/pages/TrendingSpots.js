import React, { useState, useEffect } from 'react';
import './TrendingSpots.css';
import Frame from '../components/Frame/Frame';

function TrendingSpots({ requestId, city, latitude, longitude }) {
	const [trendingSpots, setTrendingSpots] = useState([]);
	const [weekDate, setWeekDate] = useState('');

	useEffect(() => {
		document.body.className = 'trendingBody';
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
							tag,
							date_retrieved
						}
					}
					`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.imagesForRequestId
						&& res.data.imagesForRequestId.length !== 0
						&& setTrendingSpots(res.data.imagesForRequestId)
						&& setWeekDate(res.data.imagesForRequestId[0].date_retrieved);
				});
		}
		fetchData();
	}, [requestId]);
	// console.log(trendingSpots);
	return (
		<div className="wrapper">
			{Object.keys(trendingSpots).length === 0 ? (
				<div className="mainTitle">Subscribe to see Trending Spots!</div>
			) : (
				<>
					<div className="mainTitle">Trending Spots in {city}</div>
					<div className="CSSgrid">
						{trendingSpots.map((image, idx) => {
							const imageUrl = image.image_link;
							const { geolocation } = image;
							const { caption } = image;
							if (idx < 7) {
								return (
									<div key={idx} className="instaPhoto">
										<Frame
											username={caption}
											geolocation={geolocation}
											img={imageUrl}
											style={{ width: '30px' }}
										/>
									</div>
								);
							}
							return '';
						})}
						<div className="quote">Daydream. We&apos;ll do the rest.</div>
						<div>
							<div className="weekDate">{weekDate.replace('/', '-')}</div>
							<div className="weekOf">Week of </div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default TrendingSpots;
