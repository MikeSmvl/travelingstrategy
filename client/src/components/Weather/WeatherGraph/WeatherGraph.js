import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card as RBCard} from 'react-bootstrap';
import GraphRender from './GraphRender'

const WeatherGraph = (props) => {
	const {
		children,
		destinationCity = '',
		...rest
	} = props;

  const [monthlyWeather, setMonthlyWeather] = useState('Not available yet')

  useEffect(() => {
		async function fetchData() {
			await fetch(process.env.REACT_APP_BACKEND, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					query: `{
						avgMonthlyWeather:city_average_monthly_weather(city: "${destinationCity}"){
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
				})
			})
				.then((res) => res.json())
				.then((res) => {
          console.log(res)
					res.data.avgMonthlyWeather
						&& res.data.avgMonthlyWeather.length !== 0
            && setMonthlyWeather(res.data.avgMonthlyWeather[0]);
				});
		}

		fetchData();
	}, [
		destinationCity
	]);

	return (
		<div>
		{!(monthlyWeather === null || monthlyWeather === 'Not available yet') && (
			<RBCard.Body>
				<GraphRender monthlyWeather={monthlyWeather}/>
			</RBCard.Body>
		)}
		</div>
	);
};

WeatherGraph.propTypes = {
	destinationCity: PropTypes.string
};

export default WeatherGraph;
