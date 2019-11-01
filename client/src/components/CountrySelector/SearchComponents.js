import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Button as SButton, But } from 'react-bootstrap/';

const SearchComponents = (props) => {
return(
  <div>
  <Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
    types={[]}/>
    <br></br>
    <br></br>
  <Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
    types={[]}/>
    <br></br>
    <br></br>
  <SButton variant="outline-primary">Search</SButton>
  </div>
)
};

export default SearchComponents;