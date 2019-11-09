import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import './CountrySelector.css';

const CountrySelector = props => {
  const [origin, setOrigin] = useState('');
	const [destination, setDestination] = useState('');
	const [validOrig, setValidOrig] = useState(true);
	const [validDest, setValidDest] = useState(true);

  const handleSubmit = event => {
    if (!origin || !destination) {
      event.preventDefault();
			event.stopPropagation();
			if (!origin) setValidOrig(false);
			if (!destination) setValidDest(false);
		}
  };

  const { originLabel = '', destinationLabel = '' } = props;

  return (
    <div className="country-selector-form">
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center" style={{height: '100px'}}>
          <Col className="originInput" xs="12" sm="3">
            <Form.Label style={{marginBottom: '4px'}}>From</Form.Label>
            <Autocomplete
              className="form-control"
              type="text"
              required
              placeholder={originLabel}
              style={{ width: '90%' }}
              onPlaceSelected={place => {
                setOrigin(place.formatted_address);
              }}
            />
						{!validOrig &&
						<span className="validate">Please select an origin from the dropdown.</span>}
          </Col>
          <Col className="destinationInput" xs="12" sm="3">
            <Form.Label style={{marginBottom: '4px'}}>To</Form.Label>
            <Autocomplete
              className="form-control"
              type="text"
              required
              placeholder={destinationLabel}
              style={{ width: '90%' }}
              onPlaceSelected={place => {
                setDestination(place.formatted_address);
              }}
            />
						{!validDest &&
						<span className="validate">Please select a destination from the dropdown.</span>}
          </Col>
          <Col
            xs="auto"
            sm="auto"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {origin && destination ? (
              <Link
                to={`/country?origin=${origin
                  .split(',')
                  .pop(-1)
                  .trim()}&destination=${destination
                  .split(',')
                  .pop(-1)
                  .trim()}`}
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
