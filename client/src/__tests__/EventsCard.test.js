import React from 'react';
import ReactDOM from 'react-dom';
import EventCard from '../components/EventsCard/EventsCard';
import IntelBot from '../components/EventsCard/IntelBot/IntelBot';
import BotSlider from '../components/EventsCard/BotSlider/BotSlider';


describe('Testing multiple component of the page', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<EventCard />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<IntelBot />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<BotSlider />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
