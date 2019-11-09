import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
// import { Link, Redirect } from 'react-router-dom';
import './CountrySelector.css';

const CountrySelector = (props) => {
	const [origin, setOrigin] = useState('');
	const [destination, setDestination] = useState('');

	/* if (valid) {
		return (
			<Redirect
				to={`/country?origin=${origin
					.split(',')
					.pop(-1)
					.trim()}&destination=${destination
					.split(',')
					.pop(-1)
					.trim()}`}></Redirect>
		);
	} */

	const { originLabel = '', destinationLabel = '' } = props;

	return (
		<div className="country-selector-form">
			<Form>
				<Row className="justify-content-center">
					<Col className="originInput" xs="12" sm="3">
						<Form.Label>From</Form.Label>
						<Autocomplete
							className="form-control"
							type="text"
							placeholder={originLabel}
							style={{ width: '90%' }}
							onPlaceSelected={(place) => {
								setOrigin(place.formatted_address);
							}}
						/>
					</Col>
					<Col className="destinationInput" xs="12" sm="3">
						<Form.Label>To</Form.Label>
						<Autocomplete
							className="form-control"
							type="text"
							placeholder={destinationLabel}
							style={{ width: '90%' }}
							onPlaceSelected={(place) => {
								setDestination(place.formatted_address);
							}}
						/>
					</Col>
					<Col
						xs="auto"
						sm="auto"
						style={{ display: 'flex', alignItems: 'flex-end' }}
					>
						<Button variant="outline-primary" type="submit">
							Compare
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default CountrySelector;
