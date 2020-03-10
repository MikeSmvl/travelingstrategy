import React from 'react';
import '../App.css';
import Slider from '../components/Slider/Slider';


function UserSelection({
	request_id,
	city,
	latitude,
	longitude
}) {
	return (
		<div>
			<Slider
				request_id={request_id}
				city={city}
				latitude={latitude}
				longitude={longitude}
			/>
		</div>
	);
}

export default UserSelection;
