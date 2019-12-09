import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import Header from './Header';

const stories = storiesOf('Header', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<Header style={{ height: '420px' }} title="Paris" title2="TimeZone" title3="TimeDifference" subtitle="France" />
	))
	.add('Set props', () => {
		const title = text('Title Text') || 'Paris';
		const title2 = text('Title Text') || 'TimeZone';
		const title3 = text('Title Text') || 'TimeDifference';
		const subtitle = text('Right text') || 'France';

		return <Header style={{ height: '420px' }} title={title} title2={title2} title3={title3} subtitle={subtitle} />;
	});
