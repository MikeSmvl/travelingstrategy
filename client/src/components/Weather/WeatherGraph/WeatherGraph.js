import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap/';
import { Card, CardBody } from '../../Card/Card';
import GraphRender from './GraphRender';

const WeatherGraph = (props) => {
	const {
		destinationCity = ''
	} = props;

	const [monthlyWeather, setMonthlyWeather] = useState('');

	useEffect(() => {
		async function fetchData() {
			await fetch(`${process.env.REACT_APP_BACKEND}graphql`, {
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
					res.data.avgMonthlyWeather
            && res.data.avgMonthlyWeather.length !== 0
            && setMonthlyWeather(res.data.avgMonthlyWeather[0]);
				});
		}
		fetchData();
	}, [
		destinationCity
	]);

	// if we dont have data for monthly temperature, we will have a link
	// this link will redirect to google with the data for temperature for the respective city
	function redirect() {
		const searchText = `average monthly temperature for ${destinationCity}`;
		const win1 = window.open(`${'//google.com/search?q='}${searchText}`, '_blank');
	}

	return (
		<Card
			header="Average Monthly Temperature"
			footer={(
				<Row className="justify-content-center"><a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> C-Reference &nbsp;</a>
				</Row>
			)}
		>
			<CardBody>
				{!monthlyWeather ? (
					<div>
						<span style={{ color: '#FF1C00' }}>Note: </span>
               We don&apos;t have any info on the average monthly temperature for
						{destinationCity}. Try <a href="#" onClick={redirect}>Googling</a> instead
					</div>
				) : (
					<div
						className="scrolling-card"
						style={{ maxHeight: '400px', overflow: 'scroll' }}
					>
						<GraphRender monthlyWeather={monthlyWeather} />
					</div>
				)}
			</CardBody>
		</Card>

	);
};

WeatherGraph.propTypes = {
	destinationCity: PropTypes.string
};

export default WeatherGraph;
