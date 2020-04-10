
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

# ISO Dict
iso_dict = {"AF":"Afghanistan","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AC":"Ascension Island","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia","BA":"Bosnia and Herzegovina","BW":"Botswana","BR":"Brazil","IO":"British Indian Ocean Territory","VG":"British Virgin Islands","BN":"Brunei","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","IC":"Canary Islands","CV":"Cape Verde","BQ":"Caribbean Netherlands","KY":"Cayman Islands","CF":"Central African Republic","EA":"Ceuta & Melilla","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo - Brazzaville","CD":"Congo - Kinshasa","CK":"Cook Islands","CR":"Costa Rica","CI":"C\u00f4te d\u2019Ivoire","HR":"Croatia","CU":"Cuba","CW":"Cura\u00e7ao","CY":"Cyprus","CZ":"Czechia","DK":"Denmark","DG":"Diego Garcia","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","SZ":"Eswatini","ET":"Ethiopia","FK":"Falkland Islands","FO":"Faeroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","XK":"Kosovo","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Laos","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia","MD":"Moldova","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar (Burma)","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","KP":"North Korea","MK":"North Macedonia","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestine","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn Islands","PL":"Poland","PT":"Portugal","XA":"Pseudo-Accents","XB":"Pseudo-Bidi","PR":"Puerto Rico","QA":"Qatar","RE":"R\u00e9union","RO":"Romania","RU":"Russia","RW":"Rwanda","WS":"Samoa","SM":"San Marino","ST":"S\u00e3o Tom\u00e9 & Pr\u00edncipe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia & South Sandwich Islands","KR":"S. Korea","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","BL":"St. Barth","SH":"St. Helena","KN":"St. Kitts & Nevis","LC":"Saint Lucia","MF":"Saint Martin","PM":"St. Pierre & Miquelon","VC":"St. Vincent Grenadines","SD":"Sudan","SR":"Suriname","SJ":"Svalbard & Jan Mayen","SE":"Sweden","CH":"Switzerland","SY":"Syria","TW":"Taiwan","TJ":"Tajikistan","TZ":"Tanzania","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TA":"Tristan da Cunha","TN":"Tunisia","TR":"Turkey","TM":"Turkey","TC":"Turks & Caicos Islands","TV":"Tuvalu","UM":"U.S. Outlying Islands","VI":"U.S. Virgin Islands","UG":"Uganda","UA":"Ukraine","AE":"UAE","GB":"UK","US":"USA","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VA":"Vatican City","VE":"Venezuela","VN":"Vietnam","WF":"Wallis & Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}

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

# United Nations Data API
united_nations_api_link = 'https://data.un.org/'

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

# Vaccines
vaccine_url = 'https://wwwnc.cdc.gov/travel/destinations/list'

# Emergency
emergency_url = 'http://chartsbin.com/view/1983'

# Email information
sender = "travelingstrategy@gmail.com"
subject = "You're travelling soon :) <3 Be ready !"
password = "buttSmell2020!"

# Instagram
instagram_url = "https://www.instagram.com/explore/tags/"

# Drug laws
canabais_url = "https://en.wikipedia.org/wiki/Legality_of_cannabis"
cocaine_url =  "https://en.wikipedia.org/wiki/Legal_status_of_cocaine"
methaphetamine_url = "https://en.wikipedia.org/wiki/Legal_status_of_methamphetamine"

#Weather
wiki_visa_temperature = "https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature"
# Covid 19
covid19_url = "https://www.worldometers.info/coronavirus/?fbclid=IwAR0DA1x4jo784QAUFcblVIhHTBLLPBdmAP-fJeU16v4aFeW0RdifaRIojhw#countries"
