import React from 'react';
import ReactDOM from 'react-dom';
import CountrySelector from '.././components/CountrySelector/CountrySelector.js'
import { BrowserRouter as Router } from 'react-router-dom';
import '.././stubs/google';


it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><CountrySelector /></Router>, div);
	ReactDOM.unmountComponentAtNode(div);
});


