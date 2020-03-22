import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withKnobs, text, select, boolean} from '@storybook/addon-knobs';
import {withInfo} from '@storybook/addon-info';
import {withA11y} from '@storybook/addon-a11y';

import Frame from './Frame';

const stories = storiesOf('Frame', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<Frame
			username='hellokitty'
			geolocation='Los Angeles'
			img='https://instagram.fymy1-2.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/90481731_278185859835682_3813958495646276013_n.jpg?_nc_ht=instagram.fymy1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=EyXj6TGCviYAX8zg5K7&oh=a7c71439157961a67d8021cc517db74e&oe=5EB3C725'
		/>
	))
	.add('Set props', () => {
		const username = text('Username') || 'hellokitty';
		const geolocation = text('Geolocation') || 'Geolocation';
		const img =
			select('Image source', [
				'https://media.newyorker.com/photos/59095c67ebe912338a37455d/master/pass/Stokes-Hello-Kitty2.jpg',
				'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
			]) ||
			'https://media.newyorker.com/photos/59095c67ebe912338a37455d/master/pass/Stokes-Hello-Kitty2.jpg';

		return <Frame username={username} geolocation={geolocation} img={img} />;
	});
