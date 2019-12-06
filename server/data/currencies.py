import sqlite3
from helper_class.api_helper import api
from helper_class.url_helper import url
from lib.config import currency_api_link, iso_list, sqlite_db
from time import sleep
from lib.database import database

# Initialize database
db = database(sqlite_db)

# Create table if not exists
db.add_table('currencies', country='text', name='text', code='text', symbol='text')

# Parse currencies and add to database
for country in iso_list:
	try:
		print('Beginning currency parsing for country: ', country)

		url_converter = url(currency_api_link)
		information_link = url_converter.get_currency_api(country)
		print('Retrieving information from following link: ', information_link)

		currency_api = api(url_converter.get_currency_api(country))
		print('Parsing returned HTML code: ', currency_api.get_code())

		data = currency_api.get_json()['currencies'][0]
		print('Following currency data was retrieved: ', data)

		print('Inserting data into database.')
		db.insert('currencies', country, data['name'], data['code'], data['symbol'])

		# sleep(5)

	except Exception as e:
		print(f'Could not get currency data for {country} because of the following error: {e}')
		pass
