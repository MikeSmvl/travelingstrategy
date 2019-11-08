import * as React from 'react';
import PropTypes from 'prop-types';
import { Navbar as RBNavbar } from 'react-bootstrap';
import logo from './logo.png';
import './Navbar.css';

const Navbar = (props) => {
  const {
    hrefBrand = '',
    title = '',
    hrefRight = '',
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
						<a href={hrefRight}>{textRight}</a>
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
