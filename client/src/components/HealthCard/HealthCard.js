import React from 'react';
import { Row, Table } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';
import {
	compareSingle,
	compareDouble,
	percentDiffColor
} from '../../utils/healthComparison';


const HealthCard = (props) => {
	const { destinationHealth = {}, originHealth = {}, destinationCountry = '' } = props;

	return (
		<>
			<Card data-aos="zoom-out-down" header="General Health" footer={<Row className="justify-content-center"><a href={`https://data.un.org/en/iso/${destinationCountry}.html`} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
				<CardBody>
					<Table striped bordered hover>
						<tbody>
							<tr>
								<td>
									<strong>Homicide Rate</strong>
								</td>
								<td>
									{destinationHealth.homicideRate}{' '}
									<span
										style={{
											color: percentDiffColor(
												String(destinationHealth.homicideRate),
												String(originHealth.homicideRate)
											)
										}}
									>
										{compareSingle(
											String(destinationHealth.homicideRate),
											String(originHealth.homicideRate)
										)}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Infant Mortality (Per 1000)</strong>
								</td>
								<td>
									{destinationHealth.infantMortality}{' '}
									<span
										style={{
											color: percentDiffColor(
												String(destinationHealth.infantMortality),
												String(originHealth.infantMortality)
											)
										}}
									>
										{compareSingle(
											String(destinationHealth.infantMortality),
											String(originHealth.infantMortality)
										)}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Life Expectancy (f/m, years)</strong>
								</td>
								<td>
									{destinationHealth.lifeExpectancy}{' '}
									<span style={{ color: 'blue' }}>
										{compareDouble(
											destinationHealth.lifeExpectancy,
											originHealth.lifeExpectancy
										)}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Number of physicians (Per 1000)</strong>
								</td>
								<td>
									{destinationHealth.nbOfPhysicians}{' '}
									<span
										style={{
											color: percentDiffColor(
												String(destinationHealth.nbOfPhysicians),
												String(originHealth.nbOfPhysicians)
											)
										}}
									>
										{compareSingle(
											String(destinationHealth.nbOfPhysicians),
											String(originHealth.nbOfPhysicians)
										)}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Sanitation (urban/rural, %)</strong>
								</td>
								<td>
									{destinationHealth.sanitation}{' '}
									<span style={{ color: 'blue' }}>
										{compareDouble(
											destinationHealth.sanitation,
											originHealth.sanitation
										)}
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<strong>Water (urban/rural, %)</strong>
								</td>
								<td>
									{destinationHealth.water}{' '}
									<span style={{ color: 'blue' }}>
										{compareDouble(
											destinationHealth.water,
											originHealth.water
										)}
									</span>
								</td>
							</tr>
						</tbody>
					</Table>
				</CardBody>
			</Card>
		</>
	);
};

export default HealthCard;
