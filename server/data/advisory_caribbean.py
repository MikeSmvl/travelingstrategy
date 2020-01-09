from helper_class.country_names import find_iso_of_country
from helper_class.country_names import find_all_iso
# from helper_class.sqlite_advisories import sqlite_advisories
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
    DB.drop(tableName)
    DB.add_table(tableName,country_iso="country_iso"
        ,name="name",advisory_text="advisory_text",visa_info="visa_info")
    for iso in data:
        name = data[iso].get('name')
        advisory_text = 'Not available yet'
        visa_info = data[iso].get('visa-info')
        try:
            DB.insert(tableName,iso, name,advisory_text,visa_info)
        except:
           LOGGER.info(f'The following is not an official country: {iso}')
    LOGGER.success(f'{tableName} was sucesfully saved to the database')

#function to replace name by iso
def replace_key_by_iso(data):
    data = find_all_iso(data)
    data_new = {}
    for k in data:
        iso = data[k].get('country-iso')
        visa_info = data[k].get('visa')
        data_new[iso] = {'name': k, 'visa-info':visa_info}
    return data_new

def save_to_caribbea():

  #Antigua and Barbuda
  LOGGER.info(f'Beginning parsing for Antigua and Barbuda')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_AG, driver)
  visa_AG = wiki_visa.visa_parser_table()
  visa_AG = replace_key_by_iso(visa_AG)
  driver.close()

  # Barbados
  LOGGER.info(f'Beginning parsing for Antigua and Barbuda')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_BB, driver)
  visa_BB = wiki_visa.visa_parser_table()
  visa_BB = replace_key_by_iso(visa_BB)
  LOGGER.success(f'Following data was retrieved: {visa_BB}')
  driver.close()

  #Bahamas
  LOGGER.info(f'Beginning parsing for Bahamas')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_BS, driver)
  visa_BS = wiki_visa.visa_parser_table()
  visa_BS = replace_key_by_iso(visa_BS)
  LOGGER.success(f'Following data was retrieved: {visa_BS}')
  driver.close()

  #Grenada
  LOGGER.info(f'Beginning parsing for Grenada')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_GD, driver)
  visa_GD = wiki_visa.visa_parser_table()
  visa_GD = replace_key_by_iso(visa_GD)
  LOGGER.success(f'Following data was retrieved: {visa_GD}')
  driver.close()

  #Jamaica
  LOGGER.info(f'Beginning parsing for Jamaica')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_JM, driver)
  visa_JM = wiki_visa.visa_parser_table()
  visa_JM = replace_key_by_iso(visa_JM)
  LOGGER.success(f'Following data was retrieved: {visa_JM}')
  driver.close()

  #Trinidad and Tobago
  LOGGER.info(f'Beginning parsing for Trinidad and Tobago')
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_TT, driver)
  visa_TT = wiki_visa.visa_parser_table()
  visa_TT = replace_key_by_iso(visa_TT)
  LOGGER.success(f'Following data was retrieved: {visa_TT}')

  driver.quit()

  save_into_db("AG", visa_AG)
  save_into_db("BB", visa_BB)
  save_into_db("BS", visa_BS)
  save_into_db("GD", visa_GD)
  save_into_db("JM", visa_JM)
  save_into_db("TT", visa_TT)

save_to_caribbea()