import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const GraphRender = (props) => {
	const {
		monthlyWeather = ''
	} = props;

	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
		datasets: [
			{
				label: '°C',
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				hoverBackgroundColor: 'rgba(75,192,192,1)',
				hoverBorderColor: 'rgba(220,220,220,1)',
				data: [monthlyWeather.january,
					monthlyWeather.february,
					monthlyWeather.march,
					monthlyWeather.april,
					monthlyWeather.may,
					monthlyWeather.june,
					monthlyWeather.july,
					monthlyWeather.august,
					monthlyWeather.septembre,
					monthlyWeather.octobre,
					monthlyWeather.novembre,
					monthlyWeather.decembre
				]
			},
			{
				label: '°F',
				backgroundColor: 'rgba(233,30,90,0.4)',
				borderColor: 'rgba(233,30,90,1)',
				pointBorderColor: 'rgba(233,30,90,1)',
				pointBackgroundColor: '#fff',
				hoverBackgroundColor: 'rgba(233,30,90,1)',
				hoverBorderColor: 'rgba(220,220,220,1)',
				data: [
					convertToFarenheit(monthlyWeather.january),
					convertToFarenheit(monthlyWeather.february),
					convertToFarenheit(monthlyWeather.march),
					convertToFarenheit(monthlyWeather.april),
					convertToFarenheit(monthlyWeather.may),
					convertToFarenheit(monthlyWeather.june),
					convertToFarenheit(monthlyWeather.july),
					convertToFarenheit(monthlyWeather.august),
					convertToFarenheit(monthlyWeather.septembre),
					convertToFarenheit(monthlyWeather.octobre),
					convertToFarenheit(monthlyWeather.novembre),
					convertToFarenheit(monthlyWeather.decembre)
				]
			}
		]
	};

	//geconvert celcius to farenheit
	function convertToFarenheit(month) {
		const farenheit = Math.round((month * 9/5) + 32);
		return farenheit;
	}

	return (
		<div>
			<Bar
				data={data}
				width={200}
				height={250}
				options={{
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						yAxes: [
							{
								gridLines: {
										drawBorder: false,
                    display: false
								}
							}
						]
    			}
				}}
			/>
		</div>
	);
};

GraphRender.propTypes = {
	monthlyWeather: PropTypes.string
};

export default GraphRender;
