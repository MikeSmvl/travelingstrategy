from helper_class.api_helper import ApiHelper
from helper_class.flags import Flags
from helper_class.logger import Logger
from helper_class.url_helper import UrlHelper
from lib.config import united_nations_api_link, iso_list, sqlite_db
from lib.database import Database
import pandas as pd

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

# Create table if it does not exist
DB.add_table('un', country='text', lifeExpectancy='text', infantMortality='text', nbOfPhysicians='text', homicideRate='text', sanitation='text', water='text')

# Parse currencies and add to database
for country in iso_list:
    try:
        LOGGER.info(f'Beginning currency parsing for country: {country}')

        url_converter = UrlHelper(united_nations_api_link)
        information_link = url_converter.get_united_nations_api(country)
        LOGGER.info(f'Retrieving information from following link: {information_link}')

        # Scrape United Nations data endpoint with Pandas
        data_tables = pd.read_html(information_link, index_col=0)
        # Pick specific dataframe that will always be the third index
        data_table = data_tables[3]
        LOGGER.info(f'Parsing returned following dataframe: {data_table}')

        # Get data of latest year (last column)
        latest_year = data_table.columns[-1]

        # Data of latest year
        data = data_table.iloc[:,-1]

        lifeExpectancy_object = data[data.index.str.startswith('Population growth rate')]
        lifeExpectancy = next(iter(data), 'no match')

        print(lifeExpectancy)
        # LOGGER.success(f'Following currency data was retrieved: {}')

        # for k, v in data.items():
        #     if v is None:
        #         data[k] = "None"

        # LOGGER.info('Inserting data into database.')
        # DB.insert_or_update('currencies', country, data['name'], data['code'], data['symbol'])

    except Exception as error_msg:
        LOGGER.error(f'Could not get currency data for {country} because of the following error: {error_msg}')
        pass
