import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CountrySelector from '../components/CountrySelector/CountrySelector';
import '../stubs/google';
import matchMedia from '../stubs/matchMedia';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><CountrySelector /></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});
