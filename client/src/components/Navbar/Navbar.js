import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Navbar as RBNavbar, Modal, Button } from 'react-bootstrap';
import logo from './logo.png';
import './Navbar.css';
import LoginForm from '../LoginForm/LoginForm';

const Navbar = (props) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const {
		hrefBrand = '',
		title = '',
		textRight = '',
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
					<RBNavbar.Text>
						<Button className="rightTitle" onClick={handleShow}>{textRight}</Button>
						<Modal show={show} onHide={handleClose} centered>
							<LoginForm />
						</Modal>
					</RBNavbar.Text>
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
