import * as React from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard, Button } from 'react-bootstrap';

const WeatherGraph = (props) => {
	const {
		children,
		destinationCity = '',
		...rest
	} = props;


	async function fetchmMonthlyWeather() {
		await fetch('http://localhost:4000/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/graphql' },
			body: `query{
        city_average_monthly_weather(city:"Paris"){
          city,
          january,
          february,
          march,
          april,
          may,
          june,
          july,
          august,
          septembre,
          octobre,
          novembre,
          decembre
        }
      }`
		});
	}

	return (
		<RBCard.Body>
			<p>hello</p>
		</RBCard.Body>
	);
};

WeatherGraph.propTypes = {
	destinationCity: PropTypes.string
};

export default WeatherGraph;
