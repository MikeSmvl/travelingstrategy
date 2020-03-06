import React from 'react';
import '../App.css';
import Slider from '../components/Slider/Slider';


const UserSelection = (props) => {
  const {
    request_id = '',
    city = '',
    latitude = '',
    longitude
  } = props;

	return (
		<div>
			<Slider 
        request_id={request_id}
        city={city}
        latitue={latitude}
        longitude={longitude}/>
		</div>
	);
};

export default UserSelection;
