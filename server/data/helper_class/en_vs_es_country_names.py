from bs4 import BeautifulSoup
from chrome_driver import create_driver, quit_driver

def en_vs_es_country_names():
    #here we can find all the isos based on spanish names
    url = 'https://es.wikipedia.org/wiki/ISO_3166-1'
    driver = create_driver()
    driver.get(url)

    soup = BeautifulSoup(driver.page_source, 'lxml')
    table = soup.find('table', attrs = {'class':'wikitable sortable jquery-tablesorter'})
    table_body = table.find('tbody')
    table_rows = table_body.find_all('tr')
    x = 0
    info = {}
    for tr in table_rows:
        x = x+1
        cols = tr.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        name_es = cols[1]
        iso = cols[2]
        info[name_es] = iso
    print(info)
    print(info['Australia'])
    return info

def get_iso_es():
    iso_es = {'Afganistán': 'AF', 'Åland, Islas': 'AX', 'Albania': 'AL', 'Alemania': 'DE', 'Andorra': 'AD', 'Angola': 'AO', 'Anguila': 'AI', 'Antártida': 'AQ', 'Antigua y Barbuda': 'AG', 'Arabia Saudita': 'SA', 'Argelia': 'DZ', 'Argentina': 'AR', 'Armenia': 'AM', 'Aruba': 'AW', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaiyán': 'AZ', 'Bahamas': 'BS', 'Bangladesh': 'BD', 'Barbados': 'BB', 'Bahréin': 'BH', 'Bélgica': 'BE', 'Belice': 'BZ', 'Benin': 'BJ', 'Bermudas': 'BM', 'Belarús': 'BY', 'Bolivia': 'BO', 'Bonaire, San Eustaquio y Saba': 'BQ', 'Bosnia y Herzegovina': 'BA', 'Botswana': 'BW', 'Brasil': 'BR', 'Brunei Darussalam': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Bután': 'BT', 'Cabo Verde': 'CV', 'Camboya': 'KH', 'Camerún': 'CM', 'Canadá': 'CA', 'Qatar': 'QA', 'Chad': 'TD', 'Chile': 'CL', 'China': 'CN', 'Chipre': 'CY', 'Colombia': 'CO', 'Comoras': 'KM', 'Corea del Norte': 'KP', 'Corea del Sur': 'KR', "Costa de Marfil": 'CI', 'Costa Rica': 'CR', 'Croacia': 'HR', 'Cuba': 'CU', 'Curaçao': 'CW', 'Dinamarca': 'DK', 'Dominica': 'DM', 'Ecuador': 'EC', 'Egipto': 'EG', 'El Salvador': 'SV', 'Emiratos Árabes Unidos': 'AE', 'Eritrea': 'ER', 'Eslovaquia': 'SK', 'Eslovenia': 'SI', 'España': 'ES', 'Estados Unidos': 'US', 'Estonia': 'EE', 'Etiopía': 'ET', 'Filipinas': 'PH', 'Finlandia': 'FI', 'Fiji': 'FJ', 'Francia': 'FR', 'Gabón': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Ghana': 'GH', 'Gibraltar': 'GI', 'Granada': 'GD', 'Grecia': 'GR', 'Groenlandia': 'GL', 'Guadeloupe': 'GP', 'Guam': 'GU', 'Guatemala': 'GT', 'Guayana Francesa': 'GF', 'Guernsey': 'GG', 'Guinea': 'GN', 'Guinea Bissau': 'GW', 'Guinea Ecuatorial': 'GQ', 'Guyana': 'GY', 'Haití': 'HT', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungría': 'HU', 'India': 'IN', 'Indonesia': 'ID', 'Iraq': 'IQ', 'Irán': 'IR', 'Irlanda': 'IE', 'Bouvet, Isla': 'BV', 'Isla de Man': 'IM', 'Navidad, Isla de': 'CX', 'Islandia': 'IS', 'Caimán, (las) Islas': 'KY', 'Cocos / Keeling, (las) Islas': 'CC', 'Cook, (las) Islas': 'CK', 'Feroe, (las) Islas': 'FO', 'Georgia del Sur (la) y las Islas Sandwich del Sur': 'GS', 'Heard (Isla) e Islas McDonald': 'HM', 'Malvinas [Falkland], (las) Islas': 'FK', 'Marianas del Norte, (las) Islas': 'MP', 'Marshall, (las) Islas': 'MH', 'Pitcairn': 'PN', 'Salomón, Islas': 'SB', 'Turcas y Caicos, (las) Islas': 'TC', 'Islas Ultramarinas Menores de los Estados Unidos (las)': 'UM', 'Vírgenes británicas, Islas': 'VG', 'Vírgenes de los Estados Unidos, Islas': 'VI', 'Israel': 'IL', 'Italia': 'IT', 'Jamaica': 'JM', 'Japón': 'JP', 'Jersey': 'JE', 'Jordania': 'JO', 'Kazajstán': 'KZ', 'Kenya': 'KE', 'Kirguistán': 'KG', 'Kiribati': 'KI', 'Kuwait': 'KW', 'Laos': 'LA', 'Lesotho': 'LS', 'Letonia': 'LV', 'Líbano': 'LB', 'Liberia': 'LR', 'Libia': 'LY', 'Liechtenstein': 'LI', 'Lituania': 'LT', 'Luxemburgo': 'LU', 'Macao': 'MO', 'Macedonia del Norte': 'MK', 'Madagascar': 'MG', 'Malasia': 'MY', 'Malawi': 'MW', 'Maldivas': 'MV', 'Mali': 'ML', 'Malta': 'MT', 'Marruecos': 'MA', 'Martinique': 'MQ', 'Mauricio': 'MU', 'Mauritania': 'MR', 'Mayotte': 'YT', 'México': 'MX', 'Micronesia': 'FM', 'Moldova': 'MD', 'Mónaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU', 'Norfolk, Isla': 'NF', 'Noruega': 'NO', 'Nueva Caledonia': 'NC', 'Nueva Zelandia': 'NZ', 'Omán': 'OM', 'Países Bajos': 'NL', 'Pakistán': 'PK', 'Palau': 'PW', 'Palestina': 'PS', 'Panamá': 'PA', 'Papúa Nueva Guinea': 'PG', 'Paraguay': 'PY', 'Perú': 'PE', 'Polinesia Francesa': 'PF', 'Polonia': 'PL', 'Portugal': 'PT', 'Puerto Rico': 'PR', 'Reino Unido de Gran Bretaña e Irlanda del Norte (el)': 'GB', 'Sahara Occidental': 'EH', 'República Centroafricana (la)': 'CF', 'Chequia': 'CZ', 'Congo': 'CG', 'Congo (la República Democrática del)': 'CD', 'Dominicana, (la) República': 'DO', 'Reunión': 'RE', 'Rwanda': 'RW', 'Rumania': 'RO', 'Rusia': 'RU', 'Samoa': 'WS', 'Samoa Americana': 'AS', 'Saint Barthélemy': 'BL', 'Saint Kitts y Nevis': 'KN', 'San Marino': 'SM', 'SaintMartin (parte francesa)': 'MF', 'San Pedro y Miquelón': 'PM', 'San Vicente y las Granadinas': 'VC', 'Santa Helena, Ascensión y Tristán de Acuña': 'SH', 'Santa Lucía': 'LC', 'Santo Tomé y Príncipe': 'ST', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra leona': 'SL', 'Singapur': 'SG', 'Sint Maarten (parteneerlandesa)': 'SX', 'República Árabe Siria': 'SY', 'Somalia': 'SO', 'Sri Lanka': 'LK', 'Eswatini, antes Swazilandia': 'SZ', 'Sudáfrica': 'ZA', 'Sudán (el)': 'SD', 'Sudán del Sur': 'SS', 'Suecia': 'SE', 'Suiza': 'CH', 'Suriname': 'SR', 'Svalbard y Jan Mayen': 'SJ', 'Tailandia': 'TH', 'Taiwán': 'TW', 'Tanzania': 'TZ', 'Tayikistán': 'TJ', 'Territorio Británico del Océano Índico (el)': 'IO', 'Tierras Australes Francesas (las)': 'TF', 'Timor-Leste': 'TL', 'Togo': 'TG', 'Tokelau': 'TK', 'Tonga': 'TO', 'Trinidad y Tobago': 'TT', 'Túnez': 'TN', 'Turkmenistán': 'TM', 'Turquía': 'TR', 'Tuvalu': 'TV', 'Ucrania': 'UA', 'Uganda': 'UG', 'Uruguay': 'UY', 'Uzbekistán': 'UZ', 'Vanuatu': 'VU', 'Santa Sede (la)': 'VA', 'Venezuela': 'VE', 'Viet Nam': 'VN', 'Wallis y Futuna': 'WF', 'Yemen': 'YE', 'Djibouti': 'DJ', 'Zambia': 'ZM', 'Zimbabwe': 'ZW'}
    return iso_es