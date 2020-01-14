import getTimeDifference from '../utils/timeDifference';

describe('Testing time difference ', () => {
	it('Positive time difference', () => {
		const utcOffsetOrigin = -4;
		const utcOffsetDestinnation = 2;
		const origin = 'Montreal';
		const timeDifference = getTimeDifference(utcOffsetOrigin, utcOffsetDestinnation, origin);
		expect(timeDifference).toMatch(/\+\d+H from Montreal/);
	});

	it('Negative time difference', () => {
		const utcOffsetOrigin = 2;
		const utcOffsetDestinnation = -4;
		const origin = 'Paris';
		const timeDifference = getTimeDifference(utcOffsetOrigin, utcOffsetDestinnation, origin);
		expect(timeDifference).toMatch(/\d+H from Paris/);
	});
});
