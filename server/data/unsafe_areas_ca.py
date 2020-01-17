import json
import time

import regex
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_all_iso
import lib.config as config
import lib.database as database

#get all links to each country info page from the canadian gov
def get_all_links():
    iso_list = config.iso_list
    data = {}
    #home page link
    home = 'https://travel.gc.ca/travelling/advisories'

    driver = create_driver()
    driver.get(home)

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

    quit_driver(driver)

    data = find_all_iso(data)
    return data

#for each country get the regional advisory if it existes
def get_regional_advisories(url,driver):

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
            # h3 = avoid_all.find('h3').text
            # more_info = avoid_all.find('p').text
            # data = data + "<br/>" + h3 + "<br/>" + more_info
            return data

    for adv in regional_adv:
        data = data + "<br/>"+adv.find('h3').text
        # more_info = adv.find('p').text
        # data = data + "<br/><b >" + h3 + "</b><br/>" + more_info

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
        except:
            print('Was not able to save the data')


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

get_all_regional_advisories()
# driver = create_driver()
# data = get_regional_advisories("https://travel.gc.ca/destinations/mali",driver)
# print(data)
# quit_driver(driver)