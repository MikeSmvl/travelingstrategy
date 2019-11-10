import React from 'react';
import Navbar from '../components/Navbar/Navbar.js'
import { shallow } from 'enzyme';
import logo from '../components/Navbar/logo.png' 


describe('Navbar component', () => {

    it('proper starting prop values', () => {	
	const wrapper = shallow(<Navbar />);
	const title = wrapper.find('.title').text();
	const hrefBrand = wrapper.find('.Navbar').childAt(0).at(0).props().href;
	const imgSRC = wrapper.find('img').props().src;
	expect(title).toEqual("");
	expect(hrefBrand).toEqual("");
	expect(imgSRC).toEqual(logo);
	});

	it('renders without crashing given props', () => {
		const props = {
		hrefBrand : 'hrefBrand',
		title : 'title',	
		}
		const wrapper = shallow(<Navbar {...props} />)
		const hrefBrand = wrapper.find('.Navbar').childAt(0).at(0).props().href;
		const title = wrapper.find('.title').text();
		expect(hrefBrand).toEqual('hrefBrand');
		expect(title).toEqual('title');
	  })
});
