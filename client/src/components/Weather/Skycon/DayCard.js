import React, { useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment';
import { setSkycon } from '../../../utils/weatherIcon';


const DayCard = (props) => {
	const {
		weekday = '',
		degreeType =''
	} = props;
	const newDate = new Date(weekday.time * 1000);
	const data = setSkycon(weekday.icon);
	const fahrenheit = Math.round(weekday.temperatureHigh);
	const celsius = Math.round((fahrenheit - 32) * 5/9)

	return (
		<div className="col-sm-6">
			<div className="card d-flex justify-content-center">
				<h2 className="card-title d-flex justify-content-center">{moment(newDate).format('dddd')}</h2>
				<p className="text-muted d-flex justify-content-center">{moment(newDate).format('MMMM Do, h:mm a')}</p>
				<div className="card-body">
					<i className="d-flex justify-content-center">
						<ReactAnimatedWeather
							icon={data.icon}
							color={data.color}
							size={50}
							animate
						/>
					</i><p />
					<h3 className="d-flex justify-content-center">{degreeType === "celsius" ? celsius + "°C" : fahrenheit + "°F"}</h3>
					<p className="d-flex justify-content-center">{weekday.summary}</p>
				</div>
			</div>
		</div>
	);
};

export default DayCard;
