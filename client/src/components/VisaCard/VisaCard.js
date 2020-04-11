import React from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';
import { getSourceUrl } from '../../utils/SourceHelper';


const VisaCard = (props) => {
	const { visaInfo = 'Not available yet', originCountry = '', formatedVisaInfo = '' } = props;

	return (
		<>
			{!(visaInfo === null || visaInfo === 'Not available yet') && (
				<Card
					data-aos="fade-left"
					header="Visa Info"
					style={{ maxHeight: '400px' }}
					footer={<Row className="justify-content-center"><a href={getSourceUrl(originCountry)} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}
				>
					<CardBody>
						<div
							style={{ maxHeight: '250px', overflow: 'scroll' }}
							dangerouslySetInnerHTML={{ __html: formatedVisaInfo }}
						/>
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default VisaCard;
