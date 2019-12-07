import sqlite3
from helper_class.api_helper import api
from helper_class.url_helper import url
from lib.config import currency_api_link, iso_list, sqlite_db
from time import sleep
from lib.database import database
from helper_class.logger import Logger
from helper_class.flags import Flags

# Initialize flags, logger & database
flags = Flags()
level = flags.get_logger_level()
logger = Logger(level=level) if level != None else Logger()
db = database(sqlite_db)

# Create table if it does not exist
db.add_table('currencies', country='text', name='text', code='text', symbol='text')

# Parse currencies and add to database
for country in iso_list:
	try:
		logger.info(f'Beginning currency parsing for country: {country}')

		url_converter = url(currency_api_link)
		information_link = url_converter.get_currency_api(country)
		logger.info(f'Retrieving information from following link: {information_link}')

		currency_api = api(url_converter.get_currency_api(country))
		logger.info(f'Parsing returned HTML code: {currency_api.get_code()}')

		data = currency_api.get_json()['currencies'][0]
		logger.success(f'Following currency data was retrieved: {data}')

		logger.info('Inserting data into database.')
		db.insert('currencies', country, data['name'], data['code'], data['symbol'])

	except Exception as e:
		logger.error(f'Could not get currency data for {country} because of the following error: {e}')
		pass
