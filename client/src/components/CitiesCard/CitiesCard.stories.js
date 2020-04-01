import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import { CitiesCard, CityImage } from './CitiesCard';

const stories = storiesOf('CitiesCard', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<CitiesCard>
			<CityImage cityName="new york" />
			<CityImage cityName="madrid" />
			<CityImage cityName="paris" />
			<CityImage cityName="yerevan" />
			<CityImage cityName="montreal" />
			<CityImage cityName="rome" />
		</CitiesCard>
	));
