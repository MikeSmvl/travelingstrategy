import { getSourceUrl, getSourceAdvisory } from '../utils/SourceHelper';

describe('Testing the srouces advisory ', () => {
	it('Currect link', () => {
		const origin = 'CA';
		const source = getSourceAdvisory(origin);
		expect(source).toMatch('https://travel.gc.ca/travelling/advisories/');
	});

	it('Testing the srouces visa info', () => {
		const origin = 'MX';
		const source = getSourceUrl(origin);
		expect(source).toMatch('https://en.wikipedia.org/wiki/Visa_requirements_for_Mexican_citizens');
	});
});
