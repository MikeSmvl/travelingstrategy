import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
import { Link } from 'react-router-dom';
import './CountrySelector.css';

const CountrySelector = props => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = event => {
    if (!origin || !destination) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const { originLabel = '', destinationLabel = '' } = props;

  return (
    <div className="country-selector-form">
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col className="originInput" xs="12" sm="3">
            <Form.Label>From</Form.Label>
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
          </Col>
          <Col className="destinationInput" xs="12" sm="3">
            <Form.Label>To</Form.Label>
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
          </Col>
          <Col
            xs="auto"
            sm="auto"
            style={{ display: 'flex', alignItems: 'flex-end' }}
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
