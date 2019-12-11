import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import RateCalculator from './RateCalculator';

const stories = storiesOf('Card', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<RateCalculator
			destinationRate={1.32}
			originCurrency="CAD"
			destCurrency="USD"
		/>
	))
	.add('Set props', () => {
		const destinationRate = text('Conversion Rate') || 1.32;
		const originCurrency = text('Origin Currency') || 'CAD';
		const destCurrency = text('Destination Currency') || 'USD';

		return (
			<RateCalculator
				destinationRate={destinationRate}
				originCurrency={originCurrency}
				destCurrency={destCurrency}
			/>
		);
	});
