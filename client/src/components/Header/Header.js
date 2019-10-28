import * as React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => {
	const {
		title = '',
		subtitle = '',
		...rest
	} = props;
	return (
		<div className="App-header" {...rest}>
				<div className="title">
					{title}
				</div>
				<div className="subtitle">
					{subtitle}
				</div>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string
};

export default Header;
