import getTimeDifference from '../utils/timeDifference';

describe('Testing time difference ', () => {
	it('Positive time difference', () => {
        const utc_offset_origin = -4;
        const utc_offset_destinnation = 2;
        const origin = "Montreal"
        const timeDifference = getTimeDifference(utc_offset_origin,utc_offset_destinnation,origin)
        expect(timeDifference).toMatch(/\+\d+H from Montreal/);
	});

	it('Negative time difference', () => {
        const utc_offset_origin = 2;
        const utc_offset_destinnation = -4;
        const origin = "Paris"
        const timeDifference = getTimeDifference(utc_offset_origin,utc_offset_destinnation,origin)
        expect(timeDifference).toMatch(/\d+H from Paris/);
	});
});
