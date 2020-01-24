import * as React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => {
	const {
		title = '',
		title2 = '',
		title3 = '',
		subtitle = '',
		...rest
	} = props;
	return (
		<div className="AppHeader" {...rest}>
			<div className="title">
				{title}
			</div>
			<div className="title2">
				{title2}
			</div>
			<div className="title3">
				{title3}
			</div>
			<div className="subtitle">
				{subtitle}
			</div>

		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string,
	title2: PropTypes.string,
	title3: PropTypes.string,
	subtitle: PropTypes.string
};

export default Header;
