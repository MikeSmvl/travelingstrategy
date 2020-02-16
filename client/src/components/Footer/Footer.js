import * as React from 'react';
import { Row, Col } from 'react-bootstrap/';
import './Footer.css';
import logo from './logo.png';

const Footer = (props) => {
    return (
			<Row style={{ padding: '40px 25px 25px 25px' }}>
				<Col sm={4} style={{ padding: '40px 25px 25px 25px' }}>
						<h2>This is the header for this section.</h2>
						<p>There will be some explanation here maybe about our website.</p>
						<img
							alt=""
							src={logo}
							width="45"
							height="45"
						    className="d-inline-block align-top"
							/>
					</Col>
					<Col sm={4} style={{ padding: '40px 25px 25px 25px' }}></Col>	
				    <Col sm={4} style={{ padding: '40px 25px 25px 25px' }}></Col>		
			</Row>
	);
};

export default Footer;
						