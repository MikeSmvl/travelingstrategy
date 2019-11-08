import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import { Card, CardBody } from './Card';

const stories = storiesOf('Card', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Base usage', () => (
		<Card title='Title' subtitle='Subtitle' header='Header' footer='Footer'><CardBody>This is the body</CardBody></Card>
	))
	.add('Set props', () => {
    const header = text('Header') || '';
		const title = text('Title') || '';
    const subtitle = text('Subtitle') || '';
    const body = text('Body content') || '';
    const footer = text('Footer') || '';

		return <Card title={title} subtitle={subtitle} header={header} footer={footer}><CardBody>{body}</CardBody></Card>;
	});
