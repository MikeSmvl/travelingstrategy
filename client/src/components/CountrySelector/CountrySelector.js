import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
import { Link} from 'react-router-dom';
import './CountrySelector.css';

const CountrySelector = (props) => {
return(
  <div className="country-selector-form">
    <Form>
      <Row className="justify-content-center">
        <Col className="originInput" xs="12" sm="3">
          <Form.Label>From</Form.Label>
          <Autocomplete className="form-control"
          placeholder="Origin"
          style={{width: '90%'}}
          onPlaceSelected={(place) => {
          console.log(place);}}
          />
        </Col>
        <Col className="destinationInput" xs="12" sm="3">
          <Form.Label>To</Form.Label>
          <Autocomplete className="form-control"
          placeholder="Destination"
          style={{width: '90%'}}
          onPlaceSelected={(place) => {
            console.log(place);}}
          />
        </Col>
        <Col xs="auto" sm="auto" style={{display: "flex", "alignItems": "flex-end"}}>
          <Link to="/country">
            <Button variant="outline-primary">Compare</Button>
          </Link>
        </Col>
      </Row>
    </Form>
  </div>
)
};

export default CountrySelector;