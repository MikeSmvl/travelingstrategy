import * as React from 'react';
import PropTypes from 'prop-types';
import {Card as RBCard, Form as RBForm, Col, Row} from 'react-bootstrap';
import './RateCalculator.css';

const RateCalculator = props => {
	const calculate = (amount, rate) => {
		setResult((amount * rate).toFixed(2));
  };

	const {
		destinationRate = 1,
		originCurrency = '',
		destCurrency = '',
		...rest
  } = props;

	const [result, setResult] = React.useState(destinationRate);

	return (
		<RBCard className='RateCalculator'>
			<RBCard.Header className='title'>Rate Converter</RBCard.Header>
			<RBCard.Body {...rest}>
				<RBForm.Group as={Row}>
					<Col sm='7'>
						<RBForm.Control
							defaultValue='1'
							onInput={e => calculate(Number(e.target.value), Number(destinationRate))}
						/>
					</Col>
					<RBForm.Label column sm='5'>
						{originCurrency}
					</RBForm.Label>
				</RBForm.Group>
				<RBForm.Group as={Row}>
					<RBForm.Label column sm='7'>
						<div className='result'>{result}</div>
					</RBForm.Label>
					<RBForm.Label column sm='5'>
						{destCurrency}
					</RBForm.Label>
				</RBForm.Group>
			</RBCard.Body>
		</RBCard>
	);
};

RateCalculator.propTypes = {
	destinationRate: PropTypes.string,
	originCurrency: PropTypes.string,
	destCurrency: PropTypes.string
};

export default RateCalculator;
