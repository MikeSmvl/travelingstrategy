import * as React from 'react';
import { Row, Col } from 'react-bootstrap/';
import './Footer.css';
import logo from './logo.png';
import emaillogo from './mail.gif';

const Footer = (props) => {
    return (
			<Row style={{ padding: '40px 25px 25px 25px' }}>
				<Col sm={4} style={{ padding: '40px 25px 25px 40px' }}>
						<Row>
							<img
								alt=""
								src={logo}
								width="60"
								height="60"
								className="d-inline-block align-top"
								/>
							<h5 className = "footerlogotitle">Traveling Strategy</h5>
						</Row>
						<br></br>	
						<h4>About Us</h4>
						<p> This website was designed by Concordia students for the capstone project.
							We wish you a happy vacation and a wonderful trip.
						</p>
						
					</Col>
					<Col sm={4} style={{ padding: '100px 40px 25px 25px' }}>
						<br></br>
						<h4>Contact Us</h4>
						<Row>
							<img 
								className="emaillogo"
								src={emaillogo} 
								width="50"
								height="50"
								alt="loading..." 
								/>
							<p className = "email"> help.travelingstrategy@gmail.com </p>	
						</Row>
					</Col>	
				    <Col sm={4} style={{ padding: '40px 25px 25px 25px' }}></Col>		
			</Row>
	);
};

export default Footer;
						