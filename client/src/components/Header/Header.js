import * as React from 'react';
import './Header.css';

const Header = props => {
	const {
		title = '',
		subtitle = '',
		...rest
	} = props;
	return (
		<div className='App-header' {...rest}>
				<div className="title">
					{title}
				</div>
				<div className="subtitle">
					{subtitle}
				</div>
		</div>
	);
};

export default Header