import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import Subtitle from './Subtitle';

const stories = storiesOf('Subtitle', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<div className="section">
			<Subtitle text="Health & Safety" />
		</div>
	))
	.add('Set props', () => {
		const atext = text('Subtitle Text') || '';

		return <Subtitle text={atext} />;
	});
