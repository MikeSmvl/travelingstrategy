from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country
from helper_class.sqlite_advisories import sqlite_advisories
import json
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import wiki_visa_url_MU
from lib.database import Database

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

def save_to_MU():
    LOGGER.info(f'Saving Mauritius into the databse')
    driver = create_driver()
    wiki_visa_url = wiki_visa_url_MU
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
    visas = wiki_visa_ob.visa_parser_table()
    info = {}
    array_info = []

    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('MU') #Mauritius is MU
    sqlite.delete_table()
    sqlite.create_table()
    for country in visas:
        iso = find_iso_of_country(country)
        if(iso != ""):
            name = country
            LOGGER.info(f'Saving {name}')
            visa_info = visas[country].get('visa') #dictionary for visa info is country{visa:text}
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

    LOGGER.success(f'Mauritius was sucesfully saved to the database')
    quit_driver(driver)

    with open('./advisory-mu.json', 'w') as outfile:
        json.dump(array_info, outfile)


# if __name__ == '__main__':
#    save_to_MU()
