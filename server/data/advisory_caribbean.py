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
from lib.config import currency_api_link, iso_list, sqlite_db, wiki_visa_url_AG, wiki_visa_url_BB, wiki_visa_url_BS, wiki_visa_url_GD, wiki_visa_url_JM, wiki_visa_url_TT
from lib.database import Database

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

def save_to_caribbea():
  
  # #Antigua and Barbuda
  driver = create_driver()
  wiki_visa = wiki_visa_parser(wiki_visa_url_AG, driver)
  visa_AG = wiki_visa.visa_parser_table()
  print(visa_AG)



  # wiki_visa_ob_AG = wiki_visa_parser(wiki_visa_url_AG, driver)
  # wiki_visa_ob_BB = wiki_visa_parser(wiki_visa_url_BB, driver)
  # wiki_visa_ob_BS = wiki_visa_parser(wiki_visa_url_BS, driver)
  # wiki_visa_ob_GD = wiki_visa_parser(wiki_visa_url_GD, driver)
  # wiki_visa_ob_JM = wiki_visa_parser(wiki_visa_url_JM, driver)
  # wiki_visa_ob_TT = wiki_visa_parser(wiki_visa_url_TT, driver)
  
  # wiki_visa_AG = wiki_visa_ob_AG.visa_parser_table()
  # wiki_visa_BB = wiki_visa_ob_BB.visa_parser_table()
  # wiki_visa_BS = wiki_visa_ob_BS.visa_parser_table()
  # wiki_visa_GD = wiki_visa_ob_GD.visa_parser_table()
  # wiki_visa_JM = wiki_visa_ob_JM.visa_parser_table()
  # wiki_visa_TT = wiki_visa_ob_TT.visa_parser_table()

# info{}
# array_info = []

# for country in visas:
#     iso = find_iso_of_country(country)
#     visa_info = visas[country].get('visa')
#     info = {
#             "country_iso" : iso,
#             "visa_info": visa_info
#             }
#     array_info.append(info)

# print(array_info)

# quit_driver(quit)

if __name__ == '__main__':
     save_to_caribbea() 
     