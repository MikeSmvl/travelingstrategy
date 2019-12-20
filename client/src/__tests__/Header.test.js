import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Header/Header';


describe('Header component', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<Header />);
		const title = wrapper.find('.title').text();
		const subtitle = wrapper.find('.subtitle').text();
		expect(title).toEqual('');
		expect(subtitle).toEqual('');
	});

	it('renders without crashing given props', () => {
		const props = {
			title: '',
			subtitle: ''
		};
		const wrapper = shallow(<Header {...props} />);
		const title = wrapper.find('.title').text();
		const subtitle = wrapper.find('.subtitle').text();
		expect(title).toEqual('France');
		expect(subtitle).toEqual('Paris');
	});
});
