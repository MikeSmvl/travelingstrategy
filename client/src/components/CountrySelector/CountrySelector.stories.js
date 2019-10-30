import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';

import CountrySelector from './CountrySelector';

const stories = storiesOf('CountrySelector', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withInfo);
stories.addDecorator(withA11y);

