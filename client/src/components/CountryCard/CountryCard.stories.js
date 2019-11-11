import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import { CountryCard, CountryBody } from './CountryCard';

const stories = storiesOf('CountryCard', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<CountryCard title="Title" flagSrc="https://www.countryflags.io/fr/flat/64.png">
			<CountryBody>This is the body</CountryBody>
		</CountryCard>
	))
	.add('Set props', () => {
		const src = select('Country flag', ['dk', 'us', 'am']) || 'dk';
		const title = text('Title') || '';
		const flagSrc = `https://www.countryflags.io/${src}/flat/64.png`;
		const body = text('Body content') || '';

		return (
			<CountryCard title={title} flagSrc={flagSrc}>
				<CountryBody>{body}</CountryBody>
			</CountryCard>
		);
	});
