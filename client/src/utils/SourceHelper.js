
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
    function getSourceAdvisory (countryCode) {
            if (isoCountries.hasOwnProperty(countryCode)) {
                return isoCountries[countryCode];
        } 
            else {
                return "";
            }
    }

    
var isoCountries0 = {
    'CA' : 'https://data.international.gc.ca/travel-voyage',
    'AU' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Australian_citizens',
    'GB' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_British_citizens',
    'IE' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Irish_citizens',
    'NZ' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_New_Zealand_citizens',
    'US' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens',
    'BZ' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Belizean_citizens',
    'DM' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Dominica_citizens',
    'DO' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Dominican_Republic_citizens',
    'MX' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Mexican_citizens',
    'PA' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Panamanian_citizens',
    'AG' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Antigua_and_Barbuda_citizens',
    'BB' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Barbadian_citizens',
    'BS' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Bahamian_citizens',
    'GD' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Grenadian_citizens',
    'JM' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Jamaican_citizens',
    'TT' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Trinidad_and_Tobago_citizens',
    'SG' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Singaporean_citizens',
    'MU' : 'https://en.wikipedia.org/wiki/Visa_requirements_for_Mauritian_citizens'
    }
    function getSourceUrl (countryCode) {
            if (isoCountries0.hasOwnProperty(countryCode)) {
                return isoCountries0[countryCode];
        } else {
                return " ";
        }
    }

export {getSourceUrl, getSourceAdvisory};

