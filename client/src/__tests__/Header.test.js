import React from 'react';
import Header from '../components/Header/Header.js'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'


describe('Header component', () => {
    it('renders without crashing', () => {
	
	const wrapper = shallow(<Header />);
	const title = wrapper.find('.title').text();
	const subtitle = wrapper.find('.subtitle').text();
	expect(title).toEqual("");
	expect(subtitle).toEqual("")
	});

	it('renders without crashing given props', () => {
		const props = {
		  title: "France",
		  subtitle: "Paris"
		}
		const wrapper = shallow(<Header {...props} />)
		expect(toJson(wrapper)).toMatchSnapshot()
	  })
});

