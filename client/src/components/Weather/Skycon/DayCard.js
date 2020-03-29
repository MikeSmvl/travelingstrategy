import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment';
import './DayCard.css';
import { setSkycon } from '../../../utils/weatherIcon';


const DayCard = (props) => {
	const {
		weekday = '',
		degreeType = ''
	} = props;
	const newDate = new Date(weekday.time * 1000);
	const data = setSkycon(weekday.icon);
	const fahrenheit = Math.round(weekday.temperatureHigh);
	const celsius = Math.round(((fahrenheit - 32) * 5) / 9);
	const weekdayShort = moment(newDate);

	return (
		<div>
			<strong><p className="day" style={{ fontSize: 18 }}>{moment.weekdaysShort(weekdayShort)}</p></strong>
			<i className="d-flex justify-content-center">
				<ReactAnimatedWeather
					icon={data.icon}
					color={data.color}
					size={50}
					animate
				/>
			</i><p />
			<p className="d-flex justify-content-center">{degreeType === 'celsius' ? `${celsius}°C` : `${fahrenheit}°F`}</p>
		</div>
	);
};

export default DayCard;
