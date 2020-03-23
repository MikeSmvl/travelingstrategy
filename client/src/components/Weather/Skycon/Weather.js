import React, { useEffect, useState } from 'react';
import DayCard from './DayCard';
import './Weather.css';
import DegreeToggle from './DegreeToggle';




const Weather = (props) => {
	const [responseObj, setResponseObj] = useState('Not Available Yet');
	const [degreeType, setDegreeType] = useState('celsius')
	const {
		lat,
		lng
	} = props;


	useEffect(() => {
		async function fetchData() {
			// asynchronously load contents of the url
			// return a Promise that resolves when res is loaded
			await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fa0db9aaeccf007d75ec13d7f40b337c/${lat},${lng}`)
				.then((response) => response.json()) // call this function when res is loaded
			// return a Promise with result of above function
				.then((response) => { setResponseObj(response.daily.data); });
		}

		fetchData();
	}, []);
   
	return (
		<div>
		<div className="flexbox-container">
		<DegreeToggle
		degree = {degreeType}
			 updateDegree ={setDegreeType} />
		</div>

		<div className="flexbox-container2">
			<DayCard
			    degreeType ={degreeType}
				weekday={responseObj[1]}
			/>
			<DayCard
			    degreeType ={degreeType}
				weekday={responseObj[2]}
			/>
			<DayCard
			    degreeType ={degreeType}
				weekday={responseObj[3]}
			/>
			<DayCard
			    degreeType ={degreeType}
				weekday={responseObj[4]}
			/>
			<DayCard
			    degreeType ={degreeType}
				weekday={responseObj[5]}
			/>
		</div>
		</div>
	);
};

export default Weather;
