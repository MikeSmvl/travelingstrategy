import React from 'react';
import CountrSelector from './CountrySelector';




const Dropdown= () => {
    return(
    <div  className="orderform">
    <Dropdown
      placeholder="Select Country"
      fluid
      search
      selection
      options={countryOptions}
    />
    </div>)
  };


  export default Dropdown