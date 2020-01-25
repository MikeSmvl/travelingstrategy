from helper_class.api_helper import ApiHelper
from helper_class.flags import Flags
from helper_class.logger import Logger
from helper_class.url_helper import UrlHelper
from lib.config import currency_api_link, iso_list, sqlite_db
from lib.database import Database

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

# Removing table if it was already there
DB.drop_table("currencies")
# Create table if it does not exist
DB.add_table('currencies', country='text', name='text', code='text', symbol='text')

# Parse currencies and add to database
for country in iso_list:
    try:
        LOGGER.info(f'Beginning currency parsing for country: {country}')

        url_converter = UrlHelper(currency_api_link)
        information_link = url_converter.get_currency_api(country)
        LOGGER.info(f'Retrieving information from following link: {information_link}')

        currency_api = ApiHelper(url_converter.get_currency_api(country))
        LOGGER.info(f'Parsing returned HTML code: {currency_api.get_code()}')

        data = currency_api.get_json()['currencies'][0]
        LOGGER.success(f'Following currency data was retrieved: {data}')

        for k, v in data.items():
            if v is None:
                data[k] = "None"

        LOGGER.info('Inserting data into database.')
        DB.insert_or_update('currencies', country, data['name'], data['code'], data['symbol'])

    except Exception as error_msg:
        LOGGER.error(f'Could not get currency data for {country} because of the following error: {error_msg}')
        pass
