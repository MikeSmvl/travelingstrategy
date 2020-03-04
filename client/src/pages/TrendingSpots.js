import React, { useState, useEffect } from 'react';
import { Row, Col,Button } from 'react-bootstrap/';
import '../App.css';
import { addTrendingSpots } from '../utils/parsingTools';
import basicSearch from '../utils/eventsAPI';
import Slider from '../components/Slider/Slider';
import { Link } from 'react-router-dom';


function EventsAndTrending(){
	return (
		<div>
			<Slider/>
		</div>
	);
}

export default EventsAndTrending;
