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
		<div className="AppHeader" {...rest}>
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
