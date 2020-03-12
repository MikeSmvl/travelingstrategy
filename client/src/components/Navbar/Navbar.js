import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar as RBNavbar, Dropdown } from 'react-bootstrap';
import logo from './logo.png';
import './Navbar.css';
import LoginForm from '../LoginForm/LoginForm';

const Navbar = (props) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [logOut, setLogOut] = useState(false);

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
							<Dropdown>
								<Dropdown.Toggle drop="left" variant="outline-primary" id="dropdown-basic">
									<div className="fa fa-user" />
								</Dropdown.Toggle>

								<Dropdown.Menu alignRight>
									<Dropdown.Item href="/me">Profile</Dropdown.Item>
									<Dropdown.Item onClick={() => setLogOut(true)}>Sign Out</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						)
						: (
							<RBNavbar.Text>
								<LoginForm />
							</RBNavbar.Text>
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
