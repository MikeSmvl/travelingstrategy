import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import './CountrySelector.css';
import Media from 'react-media';
import tryMe from './try-me.png';

const CountrySelector = (props) => {
	const [originCountry, setOriginCountry] = useState('');
	const [destinationCountry, setDestinationCountry] = useState('');
	const [originCity, setOriginCity] = useState('');
	const [destinationCity, setDestinationCity] = useState('');
	const [originLat, setOriginLat] = useState('');
	const [destinationLat, setDestinationLat] = useState('');
	const [originLng, setOriginLng] = useState('');
	const [destinationLng, setDestinationLng] = useState('');
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
								const iso = place.address_components.pop().short_name;
								// If it isn't a number, assume correct ISO was retrieved
								if (isNaN(iso)) {
									setOriginCountry(iso);
								} else {
									// Else pop one more time
									const newIso = place.address_components.pop().short_name;
									setOriginCountry(newIso);
								}
								setOriginCity(place.address_components[0].short_name);
								setOriginLat(Math.round(place.geometry.location.lat() * 10000000) / 10000000); // Round to 7 digits after decimal to match backend
								setOriginLng(Math.round(place.geometry.location.lng() * 10000000) / 10000000);
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
								const iso = place.address_components.pop().short_name;
								// If it isn't a number, assume correct ISO was retrieved
								if (isNaN(iso)) {
									setDestinationCountry(iso);
								} else {
									// Else pop one more time
									const newIso = place.address_components.pop().short_name;
									setDestinationCountry(newIso);
								}
								setDestinationCity(place.address_components[0].long_name);
								setDestinationLat(Math.round(place.geometry.location.lat() * 10000000) / 10000000); // Round to 7 digits after decimal to match backend
								setDestinationLng(Math.round(place.geometry.location.lng() * 10000000) / 10000000);
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
								to={`/country?originCountry=${originCountry}&destinationCountry=${destinationCountry}&originCity=${originCity}&destinationCity=${destinationCity}&originLat=${originLat}&originLng=${originLng}&destinationLat=${destinationLat}&destinationLng=${destinationLng}`}
							>
								<Button variant="outline-primary" type="submit">
                  Travel
								</Button>
							</Link>
						) : (
							<Button variant="outline-primary" type="submit">
                Travel
							</Button>
						)}
					</Col>
					<Col md="auto">
						<Media queries={{
							large: '(min-width: 1000px)'
						}}
						>
							{(matches) => (
								<>
									{matches.large
										&& (
											<img
												alt=""
												src={tryMe}
												width="100"
												height="100"
												className="d-inline-block align-top"
											/>
										)}
								</>
							)}
						</Media>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default CountrySelector;
