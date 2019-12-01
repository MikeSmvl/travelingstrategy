import * as React from 'react';
import PropTypes from 'prop-types';
import './Subtitle.css';

const Subtitle = (props) => {
	const { text = '' } = props;
	return (
		<>
			<div className="subtitle">{text}</div>
		</>
	);
};

Subtitle.propTypes = {
	text: PropTypes.string
};

export default Subtitle;
