import * as React from 'react';
import PropTypes from 'prop-types';
import './CitiesCard.css';

const CitiesCard = props => {
	return (
		<div className='outerFrame'>
			<div className='gridWrapper'>{props.children}</div>
		</div>
	);
};

const CityImage = props => {
	const {cityName = 'new york'} = props;
	const [imgSrc, setSrc] = React.useState('');

	React.useEffect(() => {
		async function fetchImage() {
			await fetch(
				`https://api.teleport.org/api/urban_areas/slug:${cityName.replace(
					' ',
					'-'
				)}/images/`
			)
				.then(response => response.json())
				.then(data => setSrc(data.photos[0].image.mobile));
		}
		fetchImage();
	}, []);

	return (
		<div
			onClick={e => console.log('Clicked')}
			className='imgContainer zoom-on-hover'>
			<img src={imgSrc} />
			<div className='imgOverlay'>{cityName}</div>
		</div>
	);
};

CityImage.propTypes = {
	cityName: PropTypes.string
};

export {CitiesCard, CityImage};
