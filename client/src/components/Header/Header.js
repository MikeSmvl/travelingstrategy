import * as React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap/';
import './Header.css';
import Button from 'react-bootstrap/Button';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';

const Header = (props) => {
	const {
		country = '',
		city = '',
		time = '',
		show = '',
		handleShow = '',
		handleClose = '',
		countryIso = 'IT',
		...rest
	} = props;
	const bg = require('./country_videos/' + countryIso + '.mp4');
	return (
		<div className="AppHeaderWrapper">
			<Row className="justify-content-center">
				<Col lg={8} style={{ border: '5px solid white', borderRadius: '20px 20px 0 0' }}>
					<div className="AppHeader" style={{ background: `linear-gradient(rgb(253, 218, 197, 0.3), rgb(253, 218, 197, 0.2)), url(${bg})` }} {...rest}>
						<div className="country">
							{country}
						</div>
						<div className="city">
							{city}
						</div>
						<div className="time">
							{time}
						</div>
						<div className="text-center">
							<Button variant="outline-primary" className="subscribe" onClick={handleShow}>Stay Informed</Button>
							<SubscriptionModal
								show={show}
								handleShow={handleShow}
								handleClose={handleClose}
								city={city}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

Header.propTypes = {
	country: PropTypes.string,
	city: PropTypes.string,
	time: PropTypes.string,
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	countryIso: PropTypes.string
};


export default Header;
