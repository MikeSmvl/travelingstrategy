import * as React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';
import {AwesomeButton} from 'react-awesome-button';
import logo from './logo.png';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
import 'react-awesome-button/dist/styles.css';

const Footer = (props) => {
	const {
		show = '',
		handleShow = '',
		handleClose = '',
		city = '',
		lat = '',
		lng = '',
		email = '',
	} = props;
	return (
		<div className='footerWrapper'>
			<img alt='' src={logo} width='60' height='60' className='footerLogo' />
			<div className='aboutUs'>
				<h4>About</h4>
				<p>
					This website was designed by Concordia students for the capstone
					project. We wish you a happy vacation and a wonderful trip.
				</p>
			</div>
			<div className='footerLinks'>
				<AwesomeButton
					type='secondary'
					size='small'
					className='stayInformedBtn'
					href='mailto:info@solutionbati.ca'>
					<img
						src='https://image.flaticon.com/icons/svg/1034/1034146.svg'
						width='25'
						height='25'
					/>
				</AwesomeButton>
				<AwesomeButton
					type='secondary'
					size='small'
					onPress={handleShow}
					className='stayInformedBtn'>
					Subscribe
				</AwesomeButton>
				<SubscriptionModal
					show={show}
					handleShow={handleShow}
					handleClose={handleClose}
					city={city}
					lat={lat}
					lng={lng}
					emailLogged={email}
				/>
				<p>© 2020 Traveling Strategy</p>
			</div>
		</div>
	);
};
Footer.propTypes = {
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	city: PropTypes.string,
	lat: PropTypes.string,
	lng: PropTypes.string,
};

export default Footer;
