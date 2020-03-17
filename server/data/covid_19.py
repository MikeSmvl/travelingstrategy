from helper_class.api_helper import ApiHelper
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import covid19_url, iso_list, sqlite_db, iso_dict
from lib.database import Database
import pandas as pd
from requests import get
from math import isnan

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

# Create table if it does not exist
DB.add_table('covid19', country='text primary key', totalcases='text', newcases='text', totaldeaths='text', newdeaths='text', totalrecovered='text', activecases='text', seriouscritical='text')

LOGGER.info(f'Retrieving information from following link: {covid19_url}')

# Pretend to be a browser to avoid HTTP 403
header = {
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36",
  "X-Requested-With": "XMLHttpRequest"
}
r = get(covid19_url, headers=header)

# Scrape Worldometers data endpoint with Pandas
data_table = pd.read_html(r.text, index_col=0)
data_frame = data_table[0]
data_frame.fillna('-', inplace=True)
# data_frame.applymap(str)

# Parse data and add to database
for iso in iso_list:
    try:
        LOGGER.info(f'Beginning currency parsing for country: {iso_dict[iso]}')

        # Get total cases
        total_cases = str(data_frame.loc[iso_dict[iso], 'TotalCases'])
        LOGGER.info(f'Parsing returned following total cases: {total_cases}')

        # Get new cases
        new_cases = str(data_frame.loc[iso_dict[iso], 'NewCases'])
        LOGGER.info(f'Parsing returned following new cases: {new_cases}')

        # Get total deaths
        total_deaths = str(data_frame.loc[iso_dict[iso], 'TotalDeaths'])
        LOGGER.info(f'Parsing returned following total deaths: {total_deaths}')

        # Get new deaths
        new_deaths = str(data_frame.loc[iso_dict[iso], 'NewDeaths'])
        LOGGER.info(f'Parsing returned following new deaths: {new_deaths}')

        # Get total recovered
        total_recovered = str(data_frame.loc[iso_dict[iso], 'TotalRecovered'])
        LOGGER.info(f'Parsing returned following total recovered: {total_recovered}')

        # Get active cases
        active_cases = str(data_frame.loc[iso_dict[iso], 'ActiveCases'])
        LOGGER.info(f'Parsing returned following active cases: {active_cases}')

        # Get serious critical
        serious_critical = str(data_frame.loc[iso_dict[iso], 'Serious,Critical'])
        LOGGER.info(f'Parsing returned following total recovered: {serious_critical}')

        LOGGER.info('Inserting data into database.')
        DB.insert_or_update('covid19', iso, total_cases, new_cases, total_deaths, new_deaths, total_recovered, active_cases, serious_critical)

    except Exception as error_msg:
        LOGGER.error(f'Could not parse data for {iso} because of the following error: {error_msg}')
        # exit()
        # pass
