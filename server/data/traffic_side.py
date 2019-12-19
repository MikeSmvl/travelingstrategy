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

def get_country_traffic_side():
    array_of_country_info = []
    already_parsed = []
    try:
        # this is the link to the first page
        url = 'https://www.worldstandards.eu/cars/list-of-left-driving-countries/'
        driver = create_driver()
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')
        table = soup.find('table')
        tbody = table.find('tbody')
        allRows = tbody.findAll('tr')
        for country_row in allRows:
            isHeader = country_row.find('th') != None #The header row should be discarded
            if(not isHeader):
                country = country_row.findAll('td')[0].text
                traffic_side = country_row.findAll('td')[1].text
                country_name_has_bracket = country.find('(')
                if(country_name_has_bracket > -1): #We want to remove the bracket from the country name
                    country = country[0:country_name_has_bracket]

                country_iso = find_iso_of_country(country)
                if(country_iso != ""):
                    if country_iso not in already_parsed: # Only parse the main traffic side of a country
                        if "left" in traffic_side:
                            traffic_side = "left"
                        else:
                            traffic_side = "right"
                        info = {
                                "country_iso": country_iso,
                                "country_name": country,
                                "traffic_side": traffic_side
                                }
                        already_parsed.append(country_iso)
                        array_of_country_info.append(info)
                    else:
                        print("The main land for this country is parsed already", country)
        return array_of_country_info

    finally:
        driver.close()
        driver.quit()

def save_traffic_side():
    DB.drop_table('traffic')
    DB.add_table('traffic', country_iso='text', country_name="text", traffic_side='text')
    traffic_info = get_country_traffic_side()

    for country_traffic in traffic_info:
        country_iso = country_traffic.get("country_iso")
        country_name = country_traffic.get("country_name")
        traffic_side = country_traffic.get("traffic_side")
        DB.insert_or_update('traffic', country_iso,country_name, traffic_side)


if __name__ == '__main__':
    save_traffic_side()
