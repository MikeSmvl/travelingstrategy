import React from 'react';
import '../App.css';
import Slider from '../components/Slider/Slider';


function UserSelection({
	requestId,
	city,
	latitude,
	longitude
}) {
	return (
		<div>
			<Slider
				requestId={requestId}
				city={city}
				latitude={latitude}
				longitude={longitude}
			/>
		</div>
	);
}

export default UserSelection;
