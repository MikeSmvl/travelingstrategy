from helper_class.country_names import find_iso_of_country
from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import currency_api_link, iso_list, sqlite_db, wiki_visa_url_AG, wiki_visa_url_BB, wiki_visa_url_BS, wiki_visa_url_GD, wiki_visa_url_JM, wiki_visa_url_TT
from lib.database import Database


# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

def save_into_db(tableName, data):
  # create an an sqlite_advisory object
  LOGGER.info(f'Saving {tableName} into the databse')
  info = {}
  array_info = []
  sqlite = sqlite_advisories(tableName)
  sqlite.delete_table()
  sqlite.create_table()
  for country in data:
      iso = find_iso_of_country(country)
      if(iso != ""):
          name = country
          visa_info = data[country].get('visa') 
          advisory = None
          info = {
              "country_iso" : iso,
              "name": name,
              "advisory": advisory,
              "visa_info": visa_info
          }
          array_info.append(info)
          sqlite.new_row(iso,name,advisory,visa_info)
  sqlite.commit()
  sqlite.close()
  LOGGER.success(f'{tableName} was sucesfully saved to the database')

def save_to_caribbea():

  #Antigua and Barbuda
  LOGGER.info(f'Beginning currency parsing for Antigua and Barbuda')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_AG, driver)
  visa_AG = wiki_visa.visa_parser_table()
  driver.close()

  # Barbados
  LOGGER.info(f'Beginning currency parsing for Antigua and Barbuda')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_BB, driver)
  visa_BB = wiki_visa.visa_parser_table()
  LOGGER.success(f'Following currency data was retrieved: {visa_BB}')
  driver.close()

  #Bahamas
  LOGGER.info(f'Beginning currency parsing for Bahamas')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_BS, driver)
  visa_BS = wiki_visa.visa_parser_table()
  LOGGER.success(f'Following currency data was retrieved: {visa_BS}')
  driver.close()

  #Grenada
  LOGGER.info(f'Beginning currency parsing for Grenada')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_GD, driver)
  visa_GD = wiki_visa.visa_parser_table()
  LOGGER.success(f'Following currency data was retrieved: {visa_GD}')
  driver.close()

  #Jamaica
  LOGGER.info(f'Beginning currency parsing for Jamaica')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_JM, driver)
  visa_JM = wiki_visa.visa_parser_table()
  LOGGER.success(f'Following currency data was retrieved: {visa_JM}')
  driver.close()

  #Trinidad and Tobago
  LOGGER.info(f'Beginning currency parsing for Trinidad and Tobago')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_TT, driver)
  visa_TT = wiki_visa.visa_parser_table()
  LOGGER.success(f'Following currency data was retrieved: {visa_TT}')

  quit_driver(driver)

  save_into_db("AG", visa_AG)
  save_into_db("BB", visa_BB)
  save_into_db("BS", visa_BS)
  save_into_db("GD", visa_GD)
  save_into_db("JM", visa_JM)
  save_into_db("TT", visa_TT)

save_to_caribbea()