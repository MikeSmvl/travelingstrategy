import * as React from 'react';
import { Card } from 'react-bootstrap/';
import './WhyCard.css';
import PropTypes from 'prop-types';
import logo from '../Navbar/logo.png';


const WhyCard = (props) => {
	const { addClass = '', toggle = '', header = '', children } = props;
	return (
		<div className="why">
			<Card className={`why_inner ${addClass}`} onMouseLeave={toggle}>
				<Card.Header className="iHeader">{header}</Card.Header>
				<Card.Body className="cardBody">{children}</Card.Body>
				<Card.Footer>
					<img
						alt="error"
						src={logo}
						 width="22px"
						 height="22px"
						 align="right"
					/>
				</Card.Footer>
			</Card>
		</div>
	   );
};

WhyCard.propTypes = {
	addClass: PropTypes.string,
	header: PropTypes.string,
	toggle: PropTypes.func
};

export default WhyCard;
