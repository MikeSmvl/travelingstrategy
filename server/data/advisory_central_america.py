import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from helper_class.country_names import find_all_iso
from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import currency_api_link, iso_list, sqlite_db, wiki_visa_url_BZ
from lib.database import Database

# This file will encompass the parsing of 5 countries:
# Belize, Dominica, Dominican republic, Mexico & Panama.

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

# Create table if it does not exist for Belize, BZ
# Create table if it does not exist for Dominica, DM
# Create table if it does not exist for Dominican republic, DO
# Create table if it does not exist Mexico, MX
# Create table if it does not exist Panama, PA

def save_into_db(tableName, data):
    # create an an sqlite_advisory object
    sqlite = sqlite_advisories(tableName)
    sqlite.delete_table()
    sqlite.create_table()
    for country in data:
        iso = data[country].get('country-iso')
        name = data[country].get('name')
        text = data[country].get('advisory-text')
        visa_info = data[country].get('visa-info')
        sqlite.new_row(iso,name,text,visa_info)
    sqlite.commit()
    sqlite.close()

def mexico_all_links(driver):
    url = 'https://guiadelviajero.sre.gob.mx/'
    driver.get(url)
    soup=BeautifulSoup(driver.page_source, 'lxml')
    reg = regex.compile(r'\/103-ficha-de-paises\/')
    a = soup.findAll('a', attrs = {'href':reg})
    links = {}
    for att in a:
        links[att.text] = 'https://guiadelviajero.sre.gob.mx/'+att['href']
    return links

def save_to_central_america():

    # get urls?
    dataBZ = {}
    dataDM = {}
    dataDO = {}
    dataMX = {}
    dataPA = {}
    driver = create_driver()
    mexico_advidory = mexico_all_links(driver)
    # wiki_visa_ob_BZ = wiki_visa_parser(wiki_visa_url_BZ, driver)
    # wiki_visa_ob_DM = wiki_visa_parser(wiki_visa_url_DM, driver)
    # wiki_visa_ob_DO = wiki_visa_parser(wiki_visa_url_DO, driver)
    # wiki_visa_ob_MX = wiki_visa_parser(wiki_visa_url_MX, driver)
    # wiki_visa_ob_PA = wiki_visa_parser(wiki_visa_url_PA, driver)
    # wiki_visa_BZ = wiki_visa_ob_BZ.visa_parser_table()
    # wiki_visa_DM = wiki_visa_ob_DM.visa_parser_table()
    # wiki_visa_DO = wiki_visa_ob_DO.visa_parser_table()
    # wiki_visa_MX = wiki_visa_ob_MX.visa_parser_table()
    # wiki_visa_PA = wiki_visa_ob_PA.visa_parser_table()

    driver.quit()

    # save_into_db("BZ", dataBZ)
    # save_into_db("DM", dataDM)
    # save_into_db("DO", dataDO)
    # save_into_db("MX", dataMX)
    # save_into_db("PA", dataPA)

save_to_central_america()