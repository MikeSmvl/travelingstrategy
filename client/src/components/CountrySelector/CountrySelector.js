import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button, Form, Row, Col } from 'react-bootstrap/';
import { Link} from 'react-router-dom';
import './CountrySelector.css';

const SearchComponents = (props) => {
return(
  <div className="country-selector-form">
    <h1 className="country-selector-title">Strategy Planner</h1>
    <Form>
      <Row className="justify-content-center">
        <Col xs="1" sm="3" lg="4">
          <Form.Label>From</Form.Label>
          <Autocomplete className="form-control"
          placeholder="Origin"
          style={{width: '90%'}}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          types={[]}/>
        </Col>
        <Col xs="12" sm="3" lg="4">
          <Form.Label>To</Form.Label>
          <Autocomplete className="form-control"
          placeholder="Destination"
          style={{width: '90%'}}
          onPlaceSelected={(place) => {
            console.log(place);
          }}
          types={[]}/>
        </Col>
        <Col xs="auto" sm="auto" style={{display: "flex", "align-items": "flex-end"}}>
        <Link to="/country"><Button variant="outline-primary">Compare</Button></Link>
        </Col>
      </Row>
    </Form>
  </div>
)
};

export default SearchComponents;