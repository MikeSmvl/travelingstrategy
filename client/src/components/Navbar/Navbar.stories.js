import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, select, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {withA11y} from '@storybook/addon-a11y';

import Navbar from './Navbar';

const stories = storiesOf('Navbar', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<Navbar title='Traveling Strategy' textRight='Login' />
	))
	.add('Set props', () => {
		const title = text('Title Text') || 'Traveling Strategy';
		const textRight = text('Right text') || 'Login';

		return <Navbar title={title} textRight={textRight} />;
	});
