import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header/Header';


describe('Header component', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<Header />);
		const title = wrapper.find('.country').text();
		expect(title).toEqual('');
	});

	it('renders without crashing given props', () => {
		const props = {
			country: 'France',
			subtitle: 'Paris'
		};
		const wrapper = shallow(<Header {...props} />);
		const title = wrapper.find('.country').text();
		expect(title).toEqual('France');
	});
});
