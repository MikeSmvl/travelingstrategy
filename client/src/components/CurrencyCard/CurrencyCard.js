import React from 'react';
import { Row } from 'react-bootstrap';
import { Card, CardBody } from '../Card/Card';
import RateCalculator from '../RateCalculator/RateCalculator';


const CurrencyCard = (props) => {
	const { currencyInfo = '', rate = '', originCurrencyInfo = '' } = props;

	return (
		<>
			<Card data-aos="zoom-in" header="Currency" footer={<Row className="justify-content-center"><a href="https://restcountries.eu/#api-endpoints-currency" target="_blank" rel="noopener noreferrer"><i className="fa fa-globe" /> Reference </a></Row>}>
				<CardBody>
					<pre style={{ paddingLeft: '44px' }}>
						<strong>Name:</strong> {currencyInfo.name}
					</pre>
					<pre style={{ paddingLeft: '44px' }}>
						<strong>Code:</strong> {currencyInfo.code}
					</pre>
					<pre style={{ paddingLeft: '44px' }}>
						<strong>Symbol:</strong> {currencyInfo.symbol}
					</pre>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<RateCalculator
							destinationRate={rate}
							originCurrency={originCurrencyInfo.code}
							destCurrency={currencyInfo.code}
						/>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default CurrencyCard;
