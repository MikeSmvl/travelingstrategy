# Database
sqlite_db = 'countries.sqlite'

# ISO List
iso_list = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR",
            "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE",
            "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO",
            "BN", "BG", "BF", "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD",
            "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI",
            "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG",
            "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF",
            "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD",
            "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN",
            "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT",
            "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG",
            "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK",
            "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT",
            "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA",
            "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP",
            "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN",
            "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN",
            "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC",
            "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES",
            "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ",
            "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV",
            "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN",
            "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"]

iso_list_2 = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR",
            "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE",
            "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "VG",
            "BN", "BG", "BF", "MM", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD",
            "CL", "CN", "CX", "CC", "CO", "KM", "CD", "CG", "CK", "CR", "CI",
            "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG",
            "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF",
            "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD",
            "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN",
            "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT",
            "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG",
            "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK",
            "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT",
            "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "NA",
            "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP",
            "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PN",
            "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN",
            "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC",
            "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES",
            "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ",
            "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV",
            "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN",
            "VI", "WF", "PS", "EH", "YE", "ZM", "ZW"]

# Currency API
currency_api_link = 'https://restcountries.eu/rest/v2/alpha/'
# Gasoline, rent, and grocery API
gas_rent_grocery_api = 'http://knoema.com/api/1.0/data/'
# Median 2-bedroom apartment rent in New York
new_york_rent = 5102
# Median salary in New York
new_york_salary = 51270
# Median grocery bill in New York per month
new_york_grocery = 625

# Visa links
# Central America
wiki_visa_url_BZ = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Belizean_citizens'
wiki_visa_url_DM = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Dominica_citizens'
wiki_visa_url_DO = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Dominican_Republic_citizens'
wiki_visa_url_MX = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Mexican_citizens'
wiki_visa_url_PA = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Panamanian_citizens'

# Caribbean
wiki_visa_url_AG = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Antigua_and_Barbuda_citizens'
wiki_visa_url_BB = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Barbadian_citizens'
wiki_visa_url_BS = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Bahamian_citizens'
wiki_visa_url_GD = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Grenadian_citizens'
wiki_visa_url_JM = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Jamaican_citizens'
wiki_visa_url_TT = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Trinidad_and_Tobago_citizens'

# Asia
wiki_visa_url_SG = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Singaporean_citizens'
wiki_visa_url_MU = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Mauritian_citizens'

