import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import './CountrySelector.css';

const CountrySelector = (props) => {
	const [originCountry, setOriginCountry] = useState('');
	const [destinationCountry, setDestinationCountry] = useState('');
	const [originCity, setOriginCity] = useState('');
	const [destinationCity, setDestinationCity] = useState('');
	const [validOrig, setValidOrig] = useState(true);
	const [validDest, setValidDest] = useState(true);

	const handleSubmit = (event) => {
		if (!originCountry || !destinationCountry) {
			event.preventDefault();
			event.stopPropagation();
			if (!originCountry) setValidOrig(false);
			if (!destinationCountry) setValidDest(false);
		}
	};

	const { originLabel = '', destinationLabel = '' } = props;

	return (
		<div className="country-selector-form">
			<Form onSubmit={handleSubmit}>
				<Row className="justify-content-center" style={{ height: '100px' }}>
					<Col className="originInput" xs="12" sm="3">
						<Form.Label style={{ marginBottom: '4px' }}>From</Form.Label>
						<Autocomplete
							className="form-control"
							type="text"
							required
							placeholder={originLabel}
							types={['(cities)']}
							style={{ width: '90%' }}
							onPlaceSelected={(place) => {
								setOriginCountry(place.address_components.pop().short_name);
								setOriginCity(place.address_components[0].short_name);
							}}
						/>
						{!validOrig
						&& <span className="validate">Please select a location from the dropdown.</span>}
					</Col>
					<Col className="destinationInput" xs="12" sm="3">
						<Form.Label style={{ marginBottom: '4px' }}>To</Form.Label>
						<Autocomplete
							className="form-control"
							type="text"
							required
							placeholder={destinationLabel}
							types={['(cities)']}
							style={{ width: '90%' }}
							onPlaceSelected={(place) => {
								setDestinationCountry(place.address_components.pop().short_name);
								setDestinationCity(place.address_components[0].short_name);
							}}
						/>
						{!validDest
						&& <span className="validate">Please select a location from the dropdown.</span>}
					</Col>
					<Col
						xs="auto"
						sm="auto"
						style={{ display: 'flex', alignItems: 'center' }}
					>
						{originCountry && destinationCountry ? (
							<Link
								to={`/country?originCountry=${originCountry}&destinationCountry=${destinationCountry}&originCity=${originCity}&destinationCity=${destinationCity}`}
							>
								<Button variant="outline-primary" type="submit">
                  Compare
								</Button>
							</Link>
						) : (
							<Button variant="outline-primary" type="submit">
                Compare
							</Button>
						)}
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default CountrySelector;
