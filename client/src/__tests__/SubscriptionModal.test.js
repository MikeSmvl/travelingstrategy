import React from 'react';
import { shallow } from 'enzyme';
import SubscriptionModal from '../components/SubscriptionModal/SubscriptionModal';


describe('SubscriptionModal component', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<SubscriptionModal />);
		const city = wrapper.find('.city').length;
		expect(city).toEqual(0);
	});
});
