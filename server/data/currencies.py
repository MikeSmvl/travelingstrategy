import sqlite3
from helper_class.api_helper import api
from lib.config import currency_api_link, iso_list
from lib.url_conversion import url
from time import sleep

for country in iso_list:
	try:
		url_converter = url(currency_api_link)

		print('Beginning currency parsing for country: ', country)
		print('Retrieving information from link: ', url_converter.get_currency_api(country))

		currency_api = api(url_converter.get_currency_api(country))

		print('Parsing returned HTML code: ', currency_api.get_code())
		print('Currency data retrieved: ', currency_api.get_json()['currencies'])

		# sleep(5)

	except Exception as e:
		print(f'Could not get currency data for {country} because of the following error: {e}')
		pass
