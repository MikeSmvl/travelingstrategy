import * as React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap/';
import './Header.css';
import Button from 'react-bootstrap/Button';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';

const Header = (props) => {
	const {
		title = '',
		title2 = '',
		title3 = '',
		show = '',
		handleShow = '',
		handleClose = '',
		city = '',
		lat = '',
		lng = '',
		...rest
	} = props;
	return (
		<div className="AppHeaderWrapper">
			<Row className="justify-content-center">
				<Col lg={8} style={{ border: '5px solid white', borderRadius: '20px 20px 0 0' }}>
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
						<div className="text-center">
							<Button variant="outline-primary" className="subscribe" onClick={handleShow}>Stay Informed</Button>
							<SubscriptionModal
								show={show}
								handleShow={handleShow}
								handleClose={handleClose}
								city={city}
								lat={lat}
								lng={lng}
							/>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string,
	title2: PropTypes.string,
	title3: PropTypes.string,
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	city: PropTypes.string,
	lat: PropTypes.string,
	lng: PropTypes.string

};


export default Header;
