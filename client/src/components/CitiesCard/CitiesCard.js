import * as React from 'react';
import PropTypes from 'prop-types';
import './CitiesCard.css';

const CitiesCard = (props) => {
	const { children } = props;
	return (
		<div className="outerFrame">
			<div className="gridWrapper">{children}</div>
		</div>
	);
};

const CityImage = (props) => {
	const { cityName = 'new york' } = props;
	const [imgSrc, setSrc] = React.useState('');

	React.useEffect(() => {
		async function fetchImage() {
			await fetch(
				`https://api.teleport.org/api/urban_areas/slug:${cityName.replace(
					' ',
					'-'
				)}/images/`
			)
				.then((response) => response.json())
				.then((data) => setSrc(data.photos[0].image.mobile));
		}
		fetchImage();
	}, []);

	return (
		<div
			className="imgContainer zoom-on-hover"
		>
			<img alt="" src={imgSrc} />
			<div className="imgOverlay">{cityName}</div>
		</div>
	);
};

CityImage.propTypes = {
	cityName: PropTypes.string
};

export { CitiesCard, CityImage };
