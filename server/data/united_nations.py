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
        data_table_social = data_tables[3]
        LOGGER.info(f'Parsing returned following dataframe: {data_table_social}')

        # Get latest year
        latest_year_social = data_table_social.columns[-1]
        LOGGER.info(f'Parsing returned following year: {latest_year_social}')

        # Get data of latest year
        social_data = data_table_social.iloc[:,-1]
        LOGGER.info(f'Parsing returned following year data: {social_data}')

        lifeExpectancy_object = social_data[social_data.index.str.startswith('Life expectancy')]
        lifeExpectancy = next(iter(lifeExpectancy_object), 'no match')
        LOGGER.success(f'Following currency data was retrieved: {lifeExpectancy}')

        infantMortality_object = social_data[social_data.index.str.startswith('Infant mortality')]
        infantMortality = next(iter(infantMortality_object), 'no match')
        LOGGER.success(f'Following currency data was retrieved: {infantMortality}')

        nbOfPhysicians_object = social_data[social_data.index.str.startswith('Health: Physicians')]
        nbOfPhysicians = next(iter(nbOfPhysicians_object), 'no match')
        LOGGER.success(f'Following currency data was retrieved: {nbOfPhysicians}')

        homicideRate_object = social_data[social_data.index.str.startswith('Intentional homicide rate')]
        homicideRate = next(iter(homicideRate_object), 'no match')
        LOGGER.success(f'Following currency data was retrieved: {homicideRate}')

        # Pick specific dataframe that will always be the fourth index
        data_table_env = data_tables[4]
        LOGGER.info(f'Parsing returned following dataframe: {data_table_env}')

        # Get latest year
        latest_year_env = data_table_env.columns[-1]
        LOGGER.info(f'Parsing returned following year: {latest_year_env}')

        # Get data of latest year
        env_data = data_table_env.iloc[:,-1]
        LOGGER.info(f'Parsing returned following year data: {env_data}')

        sanitation_object = env_data[env_data.index.str.startswith('Pop. using improved sanitation')]
        sanitation = next(iter(sanitation_object), 'no match')
        LOGGER.success(f'Following currency data was retrieved: {sanitation}')

        water_object = env_data[env_data.index.str.startswith('Pop. using improved drinking water')]
        water = next(iter(water_object), 'no match')
        LOGGER.success(f'Following currency data was retrieved: {water}')

        LOGGER.info('Inserting data into database.')
        DB.insert_or_update('un', country, lifeExpectancy, infantMortality, nbOfPhysicians, homicideRate, sanitation, water)

    except Exception as error_msg:
        LOGGER.error(f'Could not get currency data for {country} because of the following error: {error_msg}')
        pass
