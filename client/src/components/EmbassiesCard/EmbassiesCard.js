import React from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';

const EmbassiesCard = (props) => {
	const { embassyInfo = '', originCountryName = '', destCountryName = '' } = props;

	return (
		<>
			<Card
				data-aos="fade-right"
				header="Embassies and Consulates"
				info="Here you can find information about embassies"
				footer={<Row className="justify-content-center"><a href="https://wikidata.org/" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}
			>
				<CardBody>
					{!embassyInfo ? (
						<div>
							Note: We don&apos;t have any info on embassies or
							consulates in {destCountryName}. Try Googling instead.
						</div>
					) : (
						<span>
							{embassyInfo.type === '2' && (
								<strong>
									Embassy of{' '}
									<span style={{ color: '#FF1C00' }}>
										{originCountryName}
									</span>
								</strong>
							)}
							{embassyInfo.type === 'consulate' && (
								<strong>
									Consulate of{' '}
									<span style={{ color: '#FF1C00' }}>
										{originCountryName}
									</span>
								</strong>
							)}
							{embassyInfo.type === 'consulate general' && (
								<strong>
									Consulate General of{' '}
									<span style={{ color: '#FF1C00' }}>
										{originCountryName}
									</span>
								</strong>
							)}
							{embassyInfo.type === 'honorary consulate' && (
								<strong>
									Honorary Consulate of{' '}
									<span style={{ color: '#FF1C00' }}>
										{originCountryName}
									</span>
								</strong>
							)}
							<div style={{ paddingBottom: '20px' }} />
							{embassyInfo.city !== '' && (
								<div style={{ paddingBottom: '5px' }}>
									<strong>City:</strong> {embassyInfo.city}
								</div>
							)}
							{embassyInfo.phone !== '' && (
								<div style={{ paddingBottom: '5px' }}>
									<strong>Phone:</strong> {embassyInfo.phone}
								</div>
							)}
							{embassyInfo.email !== '' && (
								<div style={{ paddingBottom: '5px' }}>
									<strong>Email:</strong> {embassyInfo.email}
								</div>
							)}
							{embassyInfo.website !== '' && (
								<div style={{ paddingBottom: '5px' }}>
									<strong>Website:</strong> {embassyInfo.website}
								</div>
							)}
						</span>
					)}
				</CardBody>
			</Card>
		</>
	);
};

export default EmbassiesCard;
