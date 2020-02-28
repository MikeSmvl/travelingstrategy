import * as React from 'react';
import { Row, Col } from 'react-bootstrap/';
import './Footer.css';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import logo from './logo.png';
import emaillogo from './mail.gif';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';

const Footer = (props) => {
	const {
		show = '',
		handleShow = '',
		handleClose = '',
		city = '',
		lat = '',
		lng = ''
	} = props;
	return (
		<div style={{ padding: '40px' }}>
			<Row className="justify-content-center">
				<Col sm="auto">
					<Row>
						<img
							alt=""
							src={logo}
							width="60"
							height="60"
							className="d-inline-block align-top"
						/>
						<h5 className="footerlogotitle">Traveling Strategy</h5>
					</Row>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col sm={4} style={{ padding: '40px 40px 25px 25px' }}>
					<h4>About Us</h4>
					<p> This website was designed by Concordia students for the capstone project.
							We wish you a happy vacation and a wonderful trip.
					</p>

				</Col>
				<Col sm={4} style={{ padding: '40px 40px 25px 25px' }}>
					<h4>Contact Us</h4>
					<Row>
						<img
							className="emaillogo"
							src={emaillogo}
							width="50"
							height="50"
							alt="loading..."
						/>
						<p className="email"> help.travelingstrategy@gmail.com </p>
					</Row>
				</Col>
				<Col className="aligncol" sm="auto" style={{ padding: '40px 25px 25px 25px' }}>
					<h4>Subscribe for more info</h4>
					<Button variant="outline-primary" className="subscribe" onClick={handleShow}>Stay Informed</Button>
					<SubscriptionModal
						show={show}
						handleShow={handleShow}
						handleClose={handleClose}
						city={city}
						lat={lat}
						lng={lng}
					/>
				</Col>
			</Row>
		</div>
	);
};
Footer.propTypes = {
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	city: PropTypes.string,
	lat: PropTypes.string,
	lng: PropTypes.string

};

export default Footer;
