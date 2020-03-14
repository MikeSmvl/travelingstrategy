from helper_class.country_names import find_iso_of_country
from helper_class.country_names import find_all_iso
# from helper_class.sqlite_advisories import sqlite_advisories
# from weather.wiki_weather_parser import wiki_weather_parser
from helper_class.wiki_weather_parser import wiki_weather_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import currency_api_link, iso_list, sqlite_db, wiki_visa_temperature
from lib.database import Database


FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")


def save_to_weather():

  #Antigua and Barbuda
  LOGGER.info(f'Beginning parsing for average monthly temperature')
  try:
    driver = create_driver()
    wiki_temperature = wiki_weather_parser(wiki_visa_temperature, driver)
    AVG_TEMPERATURE = wiki_temperature.visa_parser_table()
    # visa_AG = replace_key_by_iso(visa_AG)
    LOGGER.success(f'Following data was retrieved: {AVG_TEMPERATURE}')
  except Exception as error_msg:
    LOGGER.error(f'An error has occured while parsing for temperature because of the following error: {error_msg}')
  driver.close()

save_to_weather()