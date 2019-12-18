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
from lib.config import currency_api_link, iso_list, sqlite_db, wiki_visa_url_MX
from lib.database import Database
from helper_class.en_vs_es_country_names import get_iso_es

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
    DB.add_table(tableName,country_iso="country_iso"
        ,name="name",advisory_text="advisory_text",visa_info="visa_info")
    for iso in data:
        iso = data[iso].get('country_iso')
        name = data[iso].get('name')
        text = data[iso].get('advisory_text')
        visa_info = data[iso].get('visa-info')
        print(iso,name,text,visa_info)
        try:
            DB.insert_or_update(tableName,iso, name,text,visa_info)
        except:
            print("None type",iso)



def mexico_all_links(driver):
    url = 'https://guiadelviajero.sre.gob.mx/'
    driver.get(url)
    soup=BeautifulSoup(driver.page_source, 'lxml')
    reg = regex.compile(r'\/103-ficha-de-paises\/')
    a = soup.findAll('a', attrs = {'href':reg})
    links = {}
    iso_es = get_iso_es()
    c = 0
    for att in a:
        try:
            c += 1
            name = att.text.strip()
            iso = iso_es[name]
            href= 'https://guiadelviajero.sre.gob.mx'+att['href']
            links[iso] = {'advisory_text':href,'country_iso':iso,'name':name}
        except:
            print("This country's iso was not found:",att.text)
    wiki_visa_ob_MX = wiki_visa_parser(wiki_visa_url_MX, driver)
    visas = wiki_visa_ob_MX.visa_parser_table()
    visas = replace_key_by_iso(visas)
    print(visas)
    data = {}
    for key in visas:
        try:
            data[key] = links[key]
            info = data[key]
            info['visa-info'] = visas[key].get('visa-info')
        except:
            print("the followinf iso was not foud:",key)

    return links

#function to replace name by iso
def replace_key_by_iso(data):
    data = find_all_iso(data)
    data_new = {}
    for k in data:
        iso = data[k].get('country-iso')
        visa_info = data[k].get('visa')
        data_new[iso] = {'name': k, 'visa-info':visa_info}
    return data_new

def save_to_central_america():

    #create driver
    driver = create_driver()

    dataMX = mexico_all_links(driver)
    # print(dataMX)
    save_into_db('MX', dataMX)

    # wiki_visa_ob_BZ = wiki_visa_parser(wiki_visa_url_BZ, driver)
    # wiki_visa_ob_DM = wiki_visa_parser(wiki_visa_url_DM, driver)
    # wiki_visa_ob_DO = wiki_visa_parser(wiki_visa_url_DO, driver)
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