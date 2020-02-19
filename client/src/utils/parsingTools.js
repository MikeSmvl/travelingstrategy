import * as React from 'react';
import { Row} from 'react-bootstrap/';
import { Card, CardBody} from '../components/Card/Card';
import { Link } from 'react-router-dom';

const languages = (object) => {
	const items = [];
	const keys = Object.keys(object);
	keys.forEach((key) => {
		const title = key.split('_').join(' ');
		if (object[key] !== '') {
			items.push(
				<div key={key} style={{ paddingBottom: '5px' }}>
					{title}:{' '}
					{JSON.stringify(object[key]).replace(
						/(^")|("$)/g,
						''
					)}
				</div>
			);
		}
	});
	return (
		<div>
			{items}
		</div>
	);
}

const removeQuotes = (aString) => {
	aString.replace(/(^")|("$)/g, '');
};

const flagSrc = (iso) => {
	const src = `https://www.countryflags.io/${iso}/flat/64.png`;
	return src;
}

const getRate = (originCurrency, destCurrency) => {
  const api = `https://api.exchangeratesapi.io/latest?base=${originCurrency}&symbols=${destCurrency}`;
	fetch(api)
	.then((resp) => console.log('RESP.JSON ', resp.json())) // Transform the data into json
  .then((data) =>{
    console.log('DATAAAAA ', data)
    })
}

const getOtherTrafficSide = (trafficSide) => {
	if(trafficSide === "left"){
		return "right"
	}
	else{
		return "left"
	}
}

const formatingVisa = (visaInfo) => {
	var removed_double_br = visaInfo.replace("<br><br>", '<li>');
	var formatted_visa_info = removed_double_br.replace(/<br>/g, '<li>');
	return formatted_visa_info
}

function addChosenCities(arrayOfCities){
	const items = [];
	arrayOfCities.forEach(citySubscription =>{
		const city_in_url = citySubscription.city.toLowerCase().replace(' ', ''); // triming the city to match the tag
		const cityName = citySubscription.city;
		items.push(
			<Link
				to={`/trending_spots?city=${city_in_url}`}
			>
			<Row
				style={{
					backgroundColor: 'rgb(247,	247,	247)',
					padding: '0.5em',
					borderRadius: '0px'
				}}
				className="justify-content-center"
			>
			<Card
				style={{
					width: '385px',
					height: '255px'
				}}
			>
				<CardBody
					classExtra="chosen-cities">
						{cityName}
				</CardBody>
			</Card>
			</Row>
			</Link>
		);
	});
	return (
		<div>
			{items}
		</div>
	);

}



export { removeQuotes, languages, flagSrc, getRate, getOtherTrafficSide,formatingVisa, addChosenCities };