import React from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';

const PricesCard = (props) => {
	const { financialInfo = {}, currencyInfo = {} } = props;

	return (
		<>
			<Card data-aos="zoom-in-up" header="Prices" footer={<Row className="justify-content-center"><a href="https://knoema.com/atlas" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
				<CardBody>
					<pre style={{ textAlign: 'center' }}>
						<img
							src="https://image.flaticon.com/icons/svg/1505/1505581.svg"
							alt="Fuel"
							className="replaced-svg"
							style={{ width: '24px', marginRight: '10px' }}
						/>
						<strong>Gasoline:</strong> {financialInfo.gasoline}{currencyInfo.symbol} /
						Liter
					</pre>
					<pre style={{ textAlign: 'center' }}>
						<img
							src="https://image.flaticon.com/icons/svg/2372/2372132.svg"
							alt="Shopping"
							className="replaced-svg"
							style={{ width: '24px', marginRight: '10px' }}
						/>
						<strong>Groceries:</strong> {financialInfo.groceries}{currencyInfo.symbol} / Week
					</pre>
					<pre style={{ textAlign: 'center' }}>
						<img
							src="https://image.flaticon.com/icons/svg/1352/1352859.svg"
							alt="House"
							className="replaced-svg"
							style={{ width: '24px', marginRight: '10px' }}
						/>
						<strong>Rent:</strong> {(financialInfo.rent * 30).toFixed(2)}{currencyInfo.symbol} / Month
					</pre>
				</CardBody>
			</Card>
		</>
	);
};

export default PricesCard;
