import * as React from 'react';
import Autocomplete from 'react-google-autocomplete';


const SearchBar = (props) => {
return(
<Autocomplete
    style={{width: '90%'}}
    onPlaceSelected={(place) => {
      console.log(place);
    }}
    types={['(regions)']}
    componentRestrictions={{country: "ru"}}/>
)
};

export default SearchBar;