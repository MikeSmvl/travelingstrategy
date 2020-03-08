import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import Header from './Header';

const stories = storiesOf('Header', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<Header style={{ height: '420px' }} country="Paris" city="TimeZone" time="TimeDifference" subtitle="France" countryIso="FR" />
	))
	.add('Set props', () => {
		const country = text('Country Text') || 'Paris';
		const city = text('City Text') || 'TimeZone';
		const time = text('Time Text') || 'TimeDifference';
		const subtitle = text('Right text') || 'France';
		const countryIso = text('Country ISO Text') || 'FR';

		return <Header style={{ height: '420px' }} country={country} city={city} time={time} subtitle={subtitle} countryIso={countryIso} />;
	});
