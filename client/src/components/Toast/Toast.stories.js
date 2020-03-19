import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import Toast from './Toast';

const stories = storiesOf('Toast', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

stories
	.add('Basic Toast', () => (
		<Toast
      title="Toast Title"
		>
      Body of Toast
    </Toast>
  ))
  .add('Toast of type "alert"', () => (
		<Toast
      type="alert"
      title="Toast Title"
		>
      Body of Toast
    </Toast>
	))
	.add('Set props', () => {
		const type = select('Type', [
      'default',
      'alert',
    ]) || 'default';
		const title = text('Title') || 'Title';
    const body = text('Body Text') || 'Toast Body';

		return (
			<Toast
      type={type}
      title={title}
		>
      {body}
    </Toast>
		);
	});
