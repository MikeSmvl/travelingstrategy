import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar as RBNavbar, Button } from 'react-bootstrap';
import logo from './logo.png';
import './Navbar.css';
import LoginForm from '../LoginForm/LoginForm';

const Navbar = (props) => {
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		async function getToken() {
			const response = await fetch('http://localhost:4000/checktoken', { credentials: 'include' });
			if (response.ok) { // if HTTP-status is 200-299
				setAuthenticated(true);
			} else {
				// Not authenticated
			}
		}
		getToken();
	}, [authenticated]);

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
						? (<Link to="/me"><Button variant="outline-primary"><div className="fa fa-user" /></Button></Link>)
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
