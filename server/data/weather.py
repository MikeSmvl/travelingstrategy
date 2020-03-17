from bs4 import BeautifulSoup
from helper_class.wiki_weather_parser import wiki_weather_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import  wiki_visa_temperature
from lib.database import Database

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

#save weather intol DB
def save_into_db(tableName, data):
    # create an an sqlite_advisory object
    LOGGER.info(f'Start saving {tableName} table into the database')
    try:
        DB.drop_table(tableName)
        DB.add_table(tableName, city= "text", january = "text", february= "text", march = "text", april= "text", may = "text", june = "text", july = "text", august = "text", septembre = "text", octobre = "text", novembre = "text", decembre = "text")

        for city in data:
            january = data[city].get('january')
            february = data[city].get('february')
            march = data[city].get('march')
            april = data[city].get('april')
            may = data[city].get('may')
            june = data[city].get('june')
            july = data[city].get('july')
            august = data[city].get('august')
            septembre = data[city].get('septembre')
            octobre = data[city].get('octobre')
            novembre = data[city].get('novembre')
            decembre = data[city].get('decembre')

            try:
                DB.insert(tableName,city,january,february,march,april,may,june,july,august,septembre,octobre,novembre,decembre)
            except:
                LOGGER.info(f'The following did not get insterted {city}')
        LOGGER.success(f'{tableName} was successfully saved to the database')
    except Exception as error_msg:
        LOGGER.error(f'{tableName} was not successfully saved to the database because of the following error: {error_msg}')


def save_to_weather():

  #Antigua and Barbuda
  LOGGER.info(f'Beginning parsing for average monthly temperature')
  avg_monthly_temperature = ''
  try:
    driver = create_driver()
    wiki_temperature = wiki_weather_parser(wiki_visa_temperature, driver)
    avg_monthly_temperature = wiki_temperature.visa_parser_table()
    LOGGER.success(f'Following data was retrieved: {avg_monthly_temperature}')
    save_into_db('weather', avg_monthly_temperature)
    quit_driver(driver)
  except Exception as error_msg:
    LOGGER.error(f'An error has occured while parsing for temperature because of the following error: {error_msg}')


save_to_weather()