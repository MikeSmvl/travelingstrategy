import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody, Divider } from '../Card/Card';
import getCountryName from '../../utils/ISOToCountry';

const VaccinesCard = (props) => {
	const { vaccines = 'Not available yet', destinationCountry = '' } = props;
	const [vaccineCard, setVaccinCard] = useState('');

	return (
		<>
			<Card data-aos="zoom-out-up" header="Vaccines" footer={<Row className="justify-content-center"><a href={`https://wwwnc.cdc.gov/travel/destinations/traveler/none/${getCountryName(destinationCountry)}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
				<CardBody>
					<Row
						className="justify-content-center"
						style={{ padding: '0px 0px' }}
					>
						{vaccines.map((value, index) => {
							if (vaccineCard === '' && index === 0) {
								setVaccinCard(value.vaccine_info);
							}
							if (
								vaccineCard === value.vaccine_info
                                && index === 0
							) {
								return (
									<button
										type="button"
										key={value + index}
										className="tablinks"
										style={{ color: '#FF1C00' }}
										onClick={() => setVaccinCard(value.vaccine_info)}
									>
										{value.vaccine_name}
									</button>
								);
							}

							return (
								<button
									type="button"
									key={value + index}
									className="tablinks"
									onClick={() => setVaccinCard(value.vaccine_info)}
								>
									{value.vaccine_name}
								</button>
							);
						})}
					</Row>

					<Divider />
					<br />
					<Row
						className="justify-content-center"
						style={{ padding: '0px 25px' }}
					>
						<p
							dangerouslySetInnerHTML={{ __html: vaccineCard }}
							style={{ fontSize: `${1}rem` }}
						/>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default VaccinesCard;
