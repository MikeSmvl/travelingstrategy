import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar as RBNavbar, Dropdown, Col, Row } from 'react-bootstrap';
import logo from './logo.png';
import './Navbar.css';
import WhyCard from '../WhyCard/WhyCard';
import LoginForm from '../LoginForm/LoginForm';
import visitProfile from './visit-profile.png';

const Navbar = (props) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [logOut, setLogOut] = useState(false);
	const [why, setWhy] = useState(false);
	const toggleWhy = () => {
		setWhy(!why);
	};

	useEffect(() => {
		async function getToken() {
			const response = await fetch(`${process.env.REACT_APP_BACKEND}checktoken`, { credentials: 'include' });
			if (response.ok) { // if HTTP-status is 200-299
				setAuthenticated(true);
			} else {
				// Not authenticated
			}
		}
		getToken();
		async function exit() {
			const response = await fetch(`${process.env.REACT_APP_BACKEND}logout`, { credentials: 'include' });
			if (response.ok) {
				window.location.reload();
			}
		}
		if (logOut) {
			exit();
			setLogOut(true);
		}
		if (document.getElementById('visitProfile')) {
			setTimeout(() => { document.getElementById('visitProfile').style.display = 'none'; }, 4000);
		}
	}, [authenticated, logOut]);

	const {
		hrefBrand = '',
		title = '',
		...rest
	} = props;
	return (
		<>
			<RBNavbar
				fixed="top"
				variant="dark"
				className="Navbar"
				{...rest}
			>
				<RBNavbar.Brand href={hrefBrand}>
					<img
						alt=""
						src={logo}
						width="45"
						height="45"
						className="d-inline-block align-top"
					/>
					<RBNavbar.Text className="title">
						{title}
					</RBNavbar.Text>
				</RBNavbar.Brand>
				<RBNavbar.Collapse className="justify-content-end">
					{authenticated
						? (
							<Row>
								<Col>
									<img
										alt=""
										id="visitProfile"
										src={visitProfile}
										width="70"
										height="70"
									/>
								</Col>
								<Dropdown>
									<Dropdown.Toggle drop="left" variant="outline-primary" id="dropdown-basic">
										<div className="fa fa-user" />
									</Dropdown.Toggle>

									<Dropdown.Menu alignRight>
										<Dropdown.Item href="/me">Profile</Dropdown.Item>
										<Dropdown.Item onClick={() => setLogOut(true)}>Sign Out</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Row>
						)
						: (
							<Row>
								<RBNavbar.Text className="text-center">
									<button
										type="button"
										onMouseOver={toggleWhy}
										onFocus={() => null}
										onMouseLeave={toggleWhy}
										className="whyLoggin"
									/>
									{why
										? (
											<WhyCard
												toggle={toggleWhy}
												addClass="whyPosition"
												header="Why Register?"
											><span>
													<br />
													<ol>
														<li>Get access to you profile page with more information about your travel destination.</li>
														<li>See events that are occuring in your destination city.</li>
														<li>Get trending images if you stay informed.</li>
													</ol>
												</span>
											</WhyCard>
										) : null}
								</RBNavbar.Text>
								<Col>
									<RBNavbar.Text>
										<LoginForm />
									</RBNavbar.Text>
								</Col>
							</Row>
						)}
				</RBNavbar.Collapse>
			</RBNavbar>
		</>
	);
};

Navbar.propTypes = {
	hrefBrand: PropTypes.string,
	title: PropTypes.string,
	hrefRight: PropTypes.string,
	textRight: PropTypes.string
};

export default Navbar;
