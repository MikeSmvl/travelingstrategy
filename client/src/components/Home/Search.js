
import React, { Component } from 'react';

import SearchBar from 'material-ui-search-bar';

import Script from 'react-load-script';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Search extends Component {

  constructor(props) {
    super(props);


    this.state = {
      city: '',
      query: ''
    };

  }

  handleScriptLoad = () => {

    const options = {
      types: ['(cities)'],
    };


    /*global google*/ // Disables any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );


    this.autocomplete.setFields(['address_components', 'formatted_address']);

    this.autocomplete.addListener('place_changed', this.handlePlaces);
  }

  handlePlaces = () => {

    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;


    if (address) {

      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe5BJsi4ovMe0_pZhJdkBOXVVMkfF_pKs&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Search;