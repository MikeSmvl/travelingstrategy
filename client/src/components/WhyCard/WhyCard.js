import * as React from 'react';
import {Card} from 'react-bootstrap/';
import './WhyCard.css';
import logo from '../Navbar/logo.png';


const WhyCard = (props) => {
	return (
		<div class = "why">
			<Card className ={`why_inner ${props.addClass}`} onMouseLeave={props.toggle}>
				<Card.Header className="iHeader">{props.header}</Card.Header>
				<Card.Text>{props.info}</Card.Text>
				<Card.Footer>
					<img src={logo}
						 width="22px"
						 height="22px"
						 align="right"/>
				</Card.Footer>
			</Card>
		</div>
	   );
};

export default WhyCard;