import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap/';
import Button from 'react-bootstrap/Button';
import WhyCard from '../WhyCard/WhyCard';
import './Header.css';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';


const Header = (props) => {
	const {
		country = '',
		city = '',
		time = '',
		show = '',
		handleShow = '',
		handleClose = '',
		lat = '',
		lng = '',
		countryIso = 'IT',
		...rest
	} = props;
	const bg = require(`./country_videos/${countryIso}.mp4`);
	const [why, setWhy] = useState(false);
	const toggleWhy = () => {
		setWhy(!why);
	};

	return (
		<div className="AppHeaderWrapper">
			<Row className="justify-content-center">
				<Col lg={8} style={{ border: '5px solid white', borderRadius: '20px 20px 0 0' }}>
					<div className="AppHeader" {...rest}>
						<div className="overlay" />
						<video className="videoHeader" autoPlay muted loop>
							<source src={bg} type="video/mp4" />
						</video>
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
							<div>
								<Button variant="outline-primary" className="subscribe" onClick={handleShow} onMouseLeave={toggleWhy}>Stay Informed</Button>
								<button onMouseOver={toggleWhy} className="iWhy" type="button" />
								{why ? (
									<WhyCard
										addClass="whyCard"
										toggle={toggleWhy}
										header="Why Staying Informed?"
										info={(
											<span>
												<br />
												<ol>
													<li>Receive an email reminder filled with the instagram top trending images for fun ideas.</li>
													<li>See events that are occuring in your travel destination - If you have an account.</li>
												</ol>
											</span>
										)}
									/>
								) : null}
							</div>
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
	country: PropTypes.string,
	city: PropTypes.string,
	time: PropTypes.string,
	show: PropTypes.bool,
	handleShow: PropTypes.func,
	handleClose: PropTypes.func,
	lat: PropTypes.string,
	lng: PropTypes.string,
	countryIso: PropTypes.string
};


export { Header, WhyCard };
