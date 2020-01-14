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
<<<<<<< HEAD

=======
			<img
				key={pic}
				src={require(`../Header/pictures/${number}.gif`)}
				alt=''
				style={{width:"100", height:"100", position:"absolute", zIndex:"-1"}}
			/>
>>>>>>> 9f6029782117ea54e70bf79945afdc7bfd88b2bb
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
	subtitle: PropTypes.string,
};

export default Header;
