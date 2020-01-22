import json
import time

import re
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_all_iso
import lib.config as config
import lib.database as database

from helper_class.flags import Flags
from helper_class.logger import Logger

# Initialize flags & logger
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()


#get all links to each country info page from the canadian gov
def get_all_links():
    LOGGER.info('Retrieving the URLs for all countries for unsafe areas')

    iso_list = config.iso_list
    data = {}
    #home page link
    home = 'https://travel.gc.ca/travelling/advisories'

    driver = create_driver()
    driver.get(home)

    try:
        soup = BeautifulSoup(driver.page_source, 'lxml')

        table = soup.find('table', attrs={'id':'reportlist'})
        tbody = table.find('tbody')
        rows = tbody.findAll('tr')

        #parse the table get the link in the <a> tag
        for row in rows:
            col1 = row.find('a')
            name = col1.text
            href = col1['href']
            #the iso function accepts a dictionary with a key as name
            if (name == "Canary Islands"):
                data[name] = {'href':href, 'country-iso':'CI'}
            elif (name == "Saint Vincent & the Grenadines"):
                name = "Saint Vincent and the Grenadines"
            elif (name == "Virgin Islands (U.S.)"):
                name = "United States Virgin Islands"

            data[name] = {'href':href}
            LOGGER.success(f'Retrieved the URL for {name}')
        LOGGER.success('Retrieved all the URLs for unsafe areas')
    except:
        LOGGER.error('An error has occured while retrieving the URLs for all countries from the canadian travel website.')
    finally:
        quit_driver(driver)

    data = find_all_iso(data)
    return data

#for each country get the regional advisory if it existes
def get_regional_advisories(url,driver):
    try:
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        data = ""

        regional_adv = soup.findAll('div', attrs={'class':'AdvisoryContainer RegionalAdv'})

        if not regional_adv:

            avoid_all = soup.find('div', attrs={'class':'AdvisoryContainer AvoidAll'})

            if not avoid_all:
                data = "There is no regional advisory, take security precautions based on the general advisory for this country."
                return data
            else:
                data = "There is no regional advisory, take security precautions based on the general advisory for this country."
                return data

        for adv in regional_adv:
            txt = adv.find('h3').text
            if re.match('Regional', txt):
                more_info = adv.findAll(re.compile(r'p|li'))
                for p in more_info:
                    if not p.text == 'Safety and security situation':
                        if data == '':
                            data = p.text.replace('/n',' ')
                        else:
                            if p.name =='li':
                                data = data + "<li>"+ p.text.replace('/n',' ')+"</li>"
                            else:
                                data = data + "<br/>"+ p.text.replace('/n',' ')
            elif data == '':
                data = adv.find('h3').text
            else:
                data = data + "<br/>"+adv.find('h3').text
        data = data.replace('<br/><br/>', '<br/>')
    except:
        LOGGER.error(f'Could not parse the following page: {url}')
    return data

#sacve the data in the db
def save_regional_advisories(data):
    DB = database.Database(config.sqlite_db)
    tableName = "unsafe_areas"
    # create an an sqlite_advisory object
    DB.drop(tableName)
    DB.add_table(tableName,country_iso="country_iso"
        ,name="name",unsafe_areas="unsafe_areas")

    for country in data:
        info = data[country]
        country_iso = info.get('country-iso')
        unsafe_areas = info.get('unsafe_areas')

        try:
            DB.insert(tableName,country_iso, country,unsafe_areas)
            LOGGER.info(f'Could not save unsafe areas for {country} in the database.')
        except:
            LOGGER.error(f'Could not save unsafe areas for {country} in the database.')


# All unsafe areas
def get_all_regional_advisories():
    driver = create_driver()
    all_countries = get_all_links()
    data = {}
    for country in all_countries:
        name = all_countries[country]
        href = name['href']
        url = "https://travel.gc.ca" + href
        regional_advisory = get_regional_advisories(url, driver)
        data[country] = {'unsafe_areas':regional_advisory}

    data = find_all_iso(data)
    save_regional_advisories(data)
    quit_driver(driver)

def save_to_unsafe_areas():
    get_all_regional_advisories()
get_all_regional_advisories()
