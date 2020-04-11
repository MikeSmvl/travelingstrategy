import React from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';


const DrugsCard = (props) => {
	const { canabaisRecreational = '', canabaisMedical = '', cocainePossession = '', methaphetaminePossession = '' } = props;

	return (
		<>
			<Card
				data-aos="fade-left"
				header="Drug Laws"
				footer={(
					<Row className="justify-content-center"><a href="https://en.wikipedia.org/wiki/Legality_of_cannabis" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> C-Reference &nbsp;</a>
						<a href="https://en.wikipedia.org/wiki/Legal_status_of_cocaine" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> C-Reference &nbsp;</a>
						<a href="https://en.wikipedia.org/wiki/Legal_status_of_methamphetamine" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> M-Reference </a>
					</Row>
				)}
			>
				<CardBody>
					<div
						className="scrolling-card"
						style={{ maxHeight: '400px', overflow: 'scroll' }}
					>
						<p>
							<strong>Canabais recreational:</strong>{' '}
							{JSON.stringify(canabaisRecreational).replace(
								/(^")|("$)/g,
								''
							)}
						</p>
						<p>
							<strong>Canabais medical:</strong>{' '}
							{JSON.stringify(canabaisMedical).replace(
								/(^")|("$)/g,
								''
							)}
						</p>
						<p>
							<strong>Cocaine possession:</strong>{' '}
							{JSON.stringify(cocainePossession).replace(
								/(^")|("$)/g,
								''
							)}
						</p>
						<p>
							<strong>Methaphetamine possession:</strong>{' '}
							{JSON.stringify(methaphetaminePossession).replace(
								/(^")|("$)/g,
								''
							)}
						</p>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default DrugsCard;
