import React, { useState, useEffect } from 'react';
import '../App.css';
import ControlledCarousel from '../components/Slider/Slider';


const UserSelection = (props) => {
  const {
    request_id = '',
    city = '',
    latitude = '',
    longitude
  } = props;

	return (
		<div>
			<ControlledCarousel 
        request_id={request_id}
        city={city}
        latitue={latitude}
        longitude={longitude}/>
		</div>
	);
};

export default UserSelection;
