import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from helper_class.country_names import find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import iso_list, sqlite_db, wiki_visa_url_MX, wiki_visa_url_BZ, wiki_visa_url_DM, wiki_visa_url_PA, wiki_visa_url_DO
from lib.database import Database
from helper_class.en_vs_es_country_names import get_iso_es

# This file will encompass the parsing of 5 countries:
# Belize, Dominica, Dominican republic, Mexico & Panama.

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database(sqlite_db)

def save_into_db_MX(tableName, data):
    # create an an sqlite_advisory object
    DB.drop(tableName)
    DB.add_table(tableName,country_iso="country_iso"
        ,name="name",advisory_text="advisory_text",advisory_link="advisory_link",
        visa_info="visa_info")
    for iso in data:
        iso = data[iso].get('country_iso')
        name = data[iso].get('name')
        text = "Warnings provided in Spanish:"
        link = data[iso].get('advisory_text')
        visa_info = data[iso].get('visa-info')

        # print(iso,name,text,visa_info)
        try:
            DB.insert(tableName,iso, name,text,link,visa_info)
        except:
            print("None type",iso)


def save_into_db(tableName, data):
    # create an an sqlite_advisory object
    DB.drop(tableName)
    DB.add_table(tableName,country_iso="country_iso"
        ,name="name",advisory_text="advisory_text",visa_info="visa_info")
    for iso in data:
        name = data[iso].get('name')
        text = 'Not available'
        visa_info = data[iso].get('visa-info')
        try:
            DB.insert(tableName,iso, name,text,visa_info)
        except:
            print("None type",iso)


def mexico_all_links(driver):

    #the mexican website provides advisory in spanish
    #we can display the link
    url = 'https://guiadelviajero.sre.gob.mx/'
    driver.get(url)
    soup=BeautifulSoup(driver.page_source, 'lxml')
    reg = regex.compile(r'\/103-ficha-de-paises\/')
    a = soup.findAll('a', attrs = {'href':reg})

    links = {}
    iso_es = get_iso_es()

    for att in a:
        try:
            name = att.text.strip()
            iso = iso_es[name]
            href= 'https://guiadelviajero.sre.gob.mx'+att['href']
            href = '<a href =\''+href+'\'>Mexican Government Webesite</a>'
            links[iso] = {'advisory_text':href,'country_iso':iso,'name':name}
        except:
            print("This country's iso was not found:",att.text)

    #get the visa for mexico like for other countries from wikipedia
    wiki_visa_ob_MX = wiki_visa_parser(wiki_visa_url_MX, driver)
    visas = wiki_visa_ob_MX.visa_parser_table()
    visas = replace_key_by_iso(visas)

    data = {}
    for key in visas:
        try:
            data[key] = links[key]
            info = data[key]
            info['visa-info'] = visas[key].get('visa-info')
        except:
            print("the following iso was not foud:",key)

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

#main function to be run to get the visa and advisory for 5 countries
#in central america
def save_to_central_america():

    #create driver
    driver = create_driver()

    #Mexico
    data_MX = mexico_all_links(driver)
    save_into_db_MX('MX', data_MX)

    #create obj driver and set belize as first url
    driver = create_driver()
    wiki_visa = wiki_visa_parser(wiki_visa_url_BZ, driver)
    visa_BZ = wiki_visa.visa_parser_table()
    visa_BZ = replace_key_by_iso(visa_BZ)

    #Dominica
    driver.close()
    driver = create_driver()
    wiki_visa = wiki_visa_parser(wiki_visa_url_DM, driver)
    visa_DM = wiki_visa.visa_parser_table()
    visa_DM = replace_key_by_iso(visa_DM)

    #Dominican Republic
    driver.close()
    driver = create_driver()
    wiki_visa = wiki_visa_parser(wiki_visa_url_DO, driver)
    visa_DO = wiki_visa.visa_parser_table()
    visa_DO = replace_key_by_iso(visa_DO)

    #Panama
    driver.close()
    driver = create_driver()
    wiki_visa = wiki_visa_parser(wiki_visa_url_PA, driver)
    visa_PA = wiki_visa.visa_parser_table()
    visa_PA = replace_key_by_iso(visa_PA)

    driver.quit()

    #save the data into the DB
    save_into_db("BZ", visa_BZ)
    save_into_db("DM", visa_DM)
    save_into_db("DO", visa_DO)
    save_into_db("PA", visa_PA)
