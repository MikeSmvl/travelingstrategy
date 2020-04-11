import React from 'react';
import { Nav } from 'react-bootstrap/';
import './CountryNavbar.css';

const CountryNavbar = () => {
	return (
		<>
			<Nav variant="pills" className="flex-row">
				<Nav.Item>
					<Nav.Link href="#Important Basics">
						Important Basics
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="#Financials">Financials</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="#Safety">Safety</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="#Health">Health</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="#Miscellaneous">Miscellaneous</Nav.Link>
				</Nav.Item>
			</Nav>
		</>
	);
};

export default CountryNavbar;
