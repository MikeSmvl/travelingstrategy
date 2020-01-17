import * as React from 'react';

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
	if(trafficSide == "left"){
		return "right"
	}
	else{
		return "left"
	}
}

const formatingVisa = (visaInfo) => {
	var removed_double_br = visaInfo.replace("<br><br>", '<li>');
	var formatted_visa_info = removed_double_br.replace(/<br>/g, '<li>');
	// var formatted_visa_info = replaceAll(visaInfo,"<br>", "<li>")
	console.log(formatted_visa_info)
	return formatted_visa_info
}

function replaceAll(find, replace,str) {
	var re = new RegExp(find, 'g');
	str = str.replace(re, replace);
	return str;
}

export { removeQuotes, languages, flagSrc, getRate, getOtherTrafficSide,formatingVisa };