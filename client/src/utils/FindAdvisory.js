import getCountryName from '../utils/ISOToCountry';

var isoCountries = {
    'CA' : 'https://travel.gc.ca/travelling/advisories/',
    'AU' : 'https://www.smartraveller.gov.au/destinations/',
    'GB' : 'https://www.gov.uk/foreign-travel-advice/',
    'IE' : 'https://www.dfa.ie/travel/travel-advice/',
    'NZ' : 'https://safetravel.govt.nz/',
    'US' : 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/',
    'MX' : 'https://guiadelviajero.sre.gob.mx/',
    'SG' : 'https://www.mfa.gov.sg/Where-Are-You-Travelling-To'
    }
    function getSourceAdvisory (countryCode, destinationCountry) {
            if (isoCountries.hasOwnProperty(countryCode)) {
                return isoCountries[countryCode];
        } 
            else {
                return "";
            }
    }
    
    export default getSourceAdvisory;
    