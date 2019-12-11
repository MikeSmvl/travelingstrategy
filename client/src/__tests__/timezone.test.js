import findTimeZoneDifference from '../utils/timeZone';

describe('Getting time zone', () => {
	it('Time difference from Ottawa to Paris ', () => {
		const cityOrigin = 'Ottawa';
		const countryOrigin = 'Canada';
		const cityDestination = 'Paris';
		const countryDestination = 'France';
		const timeDifference = findTimeZoneDifference(
			cityOrigin,
			cityDestination,
			countryOrigin,
			countryDestination
		);
		console.log(timeDifference);
		expect(timeDifference).toMatch(/\d+H from Ottawa/);
	});

	it('Time difference from Melbourne to Ottawa', () => {
		const cityOrigin = 'Melbourne';
		const countryOrigin = 'Australia';
		const cityDestination = 'Ottawa';
		const countryDestination = 'Canada';
		const timeDifference = findTimeZoneDifference(
			cityOrigin,
			cityDestination,
			countryOrigin,
			countryDestination
		);
		console.log(timeDifference);
		expect(timeDifference).toMatch(/\d+H from Melbourne/);
	});
});
