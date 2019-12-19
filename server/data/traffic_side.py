import sqlite3
from bs4 import BeautifulSoup
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.wiki_visa_parser import wiki_visa_parser

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
                        info = {
                                "country_iso": country_iso,
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

if __name__ == '__main__':
    print(get_country_traffic_side())
