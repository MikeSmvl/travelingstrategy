import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from helper_class.country_names import find_all_iso
from helper_class.country_names import find_iso_of_country
from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import currency_api_link, iso_list, sqlite_db, wiki_visa_url_AG, wiki_visa_url_BB, wiki_visa_url_BS, wiki_visa_url_GD, wiki_visa_url_JM, wiki_visa_url_TT
from lib.database import Database

def save_into_db(tableName, data):
  # create an an sqlite_advisory object
  info = {}
  array_info = []
  sqlite = sqlite_advisories(tableName)
  sqlite.delete_table()
  sqlite.create_table()
  for country in data:
      iso = find_iso_of_country(country)
      if(iso != ""):
          name = country
          visa_info = data[country].get('visa')
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

def save_to_caribbea():

  #Antigua and Barbuda
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_AG, driver)
  visa_AG = wiki_visa.visa_parser_table()
  driver.close()

  # Barbados
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_BB, driver)
  visa_BB = wiki_visa.visa_parser_table()
  driver.close()

  # #Bahamas
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_BS, driver)
  visa_BS = wiki_visa.visa_parser_table()
  driver.close()

  # #Grenada
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_GD, driver)
  visa_GD = wiki_visa.visa_parser_table()
  driver.close()

  #Jamaica
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_JM, driver)
  visa_JM = wiki_visa.visa_parser_table()
  driver.close()

  #Trinidad and Tobago
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_TT, driver)
  visa_TT = wiki_visa.visa_parser_table()

  quit_driver(driver)

  save_into_db("AG", visa_AG)
  save_into_db("BB", visa_BB)
  save_into_db("BS", visa_BS)
  save_into_db("GD", visa_GD)
  save_into_db("JM", visa_JM)
  save_into_db("TT", visa_TT)


if __name__ == '__main__':
    save_to_caribbea()