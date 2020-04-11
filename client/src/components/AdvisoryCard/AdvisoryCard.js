import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';
import { getSourceAdvisory } from '../../utils/SourceHelper';

const AdvisoryCard = (props) => {
	const { originCountry = '', destinationCountry = '', advisoryInfo = 'Not available yet', advisoryLink = '' } = props;

	return (
		<>
			{!(
				advisoryInfo === null
            || advisoryInfo === 'Not available yet'
			) && (
				<Col xs="10" sm="6" style={{ padding: '25px' }}>
					<Card
						data-aos="fade-right"
						header="Advisory"
						style={{ maxHeight: '400px', overflow: 'scroll' }}
						footer={<Row className="justify-content-center"><a href={getSourceAdvisory(originCountry, destinationCountry)} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}
					>
						<CardBody>
							<img
								src="https://image.flaticon.com/icons/svg/827/827751.svg"
								alt="Warning"
								className="replaced-svg"
								style={{
									width: '24px',
									marginTop: '-5px',
									marginRight: '10px'
								}}
							/>
							<div
								style={{ display: 'inline' }}
								className="scrolling-card"
								dangerouslySetInnerHTML={{ __html: advisoryInfo }}
							/>
							<div dangerouslySetInnerHTML={{ __html: advisoryLink }} />
						</CardBody>
					</Card>
				</Col>
			)}
		</>
	);
};

export default AdvisoryCard;
