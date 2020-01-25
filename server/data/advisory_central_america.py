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
from helper_class.logger import Logger
from helper_class.en_vs_es_country_names import get_iso_es

# This file will encompass the parsing of 5 countries:
# Belize, Dominica, Dominican republic, Mexico & Panama.

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

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
            LOGGER.warning(f"{iso} not found")


def save_into_db(tableName, data):
    # create an an sqlite_advisory object
    DB.drop(tableName)
    DB.add_table(tableName,country_iso="country_iso"
        ,name="name",advisory_text="advisory_text",visa_info="visa_info")
    for iso in data:
        name = data[iso].get('name')
        text = 'Not available yet'
        visa_info = data[iso].get('visa-info')
        try:
            DB.insert(tableName,iso, name,text,visa_info)
            LOGGER.success(f"{tableName} successfully saved into the database")
        except Exception as error_msg:
            LOGGER.warning(f"{iso} not found")
            LOGGER.error(f'{tableName} was not successfully saved into the database because of the following error: {error_msg}')


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
    LOGGER.info(f'Retrieving the URLs for all countries for the Mexico advisory')
    for att in a:
        try:
            name = att.text.strip()
            iso = iso_es[name]
            href= 'https://guiadelviajero.sre.gob.mx'+att['href']
            href = '<a href =\''+href+'\'>Mexican Government Webesite</a>'
            links[iso] = {'advisory_text':href,'country_iso':iso,'name':name}
            Logger.success(f'The URL for {name} was successfully retrieved')
            LOGGER.success('Successfully retrieved the URLs for all countries of the Mexican advisory')
        except Exception as error_msg:
            LOGGER.warning(f"This country's iso was not found for {name} because of the following error: {error_msg}")

    #get the visa for mexico like for other countries from wikipedia
    LOGGER.info('Parsing visa requirements for all countries for the Mexican advisory')
    try:
        wiki_visa_ob_MX = wiki_visa_parser(wiki_visa_url_MX, driver)
        visas = wiki_visa_ob_MX.visa_parser_table()
        visas = replace_key_by_iso(visas)
        LOGGER.success('Successfully parsed all countries for the Mexican advisory')
    except Exception as error_msg:
        LOGGER.error(f'Was not successful in parsing visa requirements for Mexican advisory because of the following error: {error_msg}')

    data = {}
    for key in visas:
        try:
            data[key] = links[key]
            info = data[key]
            info['visa-info'] = visas[key].get('visa-info')
        except Exception as error_msg:
            LOGGER.warning(f'The following iso was not found: {key} because of the following error: {error_msg}')

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

    LOGGER.info("Begin parsing and saving for Central America...")
    #create driver
    driver = create_driver()

    #Mexico
    data_MX = mexico_all_links(driver)
    LOGGER.info("Saving Mexico to Central America")
    try:
        save_into_db_MX('MX', data_MX)
        LOGGER.success("MX successfully saved into the databse")
    except Exception as error_msg:
        LOGGER.error(f'MX was not successfully saved into the database because of the following error: {error_msg}')

    #create obj driver and set belize as first url
    driver = create_driver()
    LOGGER.info(f'Beginning parsing for Belize')
    try:
        wiki_visa = wiki_visa_parser(wiki_visa_url_BZ, driver)
        visa_BZ = wiki_visa.visa_parser_table()
        visa_BZ = replace_key_by_iso(visa_BZ)
        LOGGER.success(f'Following data was retrieved: {visa_BZ}')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while parsing for Belize because of the following error: {error_msg}')

    #Dominica
    driver.close()
    driver = create_driver()
    LOGGER.info(f'Beginning parsing for Dominica')
    try:
        wiki_visa = wiki_visa_parser(wiki_visa_url_DM, driver)
        visa_DM = wiki_visa.visa_parser_table()
        visa_DM = replace_key_by_iso(visa_DM)
        LOGGER.success(f'Following data was retrieved: {visa_DM}')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while parsing for Dominica because of the following error: {error_msg}')

    #Dominican Republic
    driver.close()
    driver = create_driver()
    LOGGER.info(f'Beginning parsing for Dominican Republic')
    try:
        wiki_visa = wiki_visa_parser(wiki_visa_url_DO, driver)
        visa_DO = wiki_visa.visa_parser_table()
        visa_DO = replace_key_by_iso(visa_DO)
        LOGGER.success(f'Following data was retrieved: {visa_DO}')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while parsing for Dominican Republic because of the following error" {error_msg}')

    #Panama
    driver.close()
    driver = create_driver()
    LOGGER.info(f'Beginning parsing for Panama')
    try:
        wiki_visa = wiki_visa_parser(wiki_visa_url_PA, driver)
        visa_PA = wiki_visa.visa_parser_table()
        visa_PA = replace_key_by_iso(visa_PA)
        LOGGER.success(f'Following data was retrieved: {visa_PA}')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while parsing for Panama because of the following error: {error_msg}')

    driver.quit()

    #save the data into the DB
    save_into_db("BZ", visa_BZ)
    save_into_db("DM", visa_DM)
    save_into_db("DO", visa_DO)
    save_into_db("PA", visa_PA)

if __name__ == "__main__":
    save_to_central_america()
