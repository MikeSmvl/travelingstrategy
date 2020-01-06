import sqlite3
from bs4 import BeautifulSoup
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from lib.config import sqlite_db
import pycountry


FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

def get_country_canabais_law():
    array_of_country_info = []
    already_parsed = []
    try:
        # this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/Legality_of_cannabis'
        driver = create_driver()
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')
        table = soup.find('table')
        tbody = table.find('tbody')
        allRows = tbody.findAll('tr')
        for country_row in allRows:
            isHeader = country_row.find('th') != None #The header row should be discarded
            country_iso = find_iso_of_country(isHeader)
            if(country_iso != ""):
                    if country_iso not in already_parsed: # Only parse the main traffic side of a country
                        info = {
                                "country_iso": country_iso,
                                "country_name": country,
                                "recreational": Recreational,
                                "medical": Medical
                                }
                        already_parsed.append(country_iso)
                        array_of_country_info.append(info)
                    else:
                        print("The main land for this country is parsed already", country)
        return array_of_country_info

    finally:
        driver.close()
        driver.quit()

def save_canabais_law():
    DB.drop_table('canabais')
    DB.add_table('canabais', country_iso='text', country_name="text", recreational='text', medical='text')
    canabais_info = get_country_canabais_law()

    for country_canabais in canabais_info:
        country_iso = country_canabais.get("country_iso")
        country_name = country_canabais.get("country_name")
        canabais_law = country_canabais.get("canabais_law")
        DB.insert_or_update('canabais', country_iso,country_name, Recreational, Medical)


if __name__ == '__main__':
    save_canabais_law()
