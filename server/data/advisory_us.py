import sqlite3
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

def get_url_of_countries():
    return

def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(19)
    return driver

def quit_driverdriver):
    driver.quit()

def save_to_united_states():

    save_into_db(data)

def parse_a_country_advisory(url, driver):

def parse_a_country_visa(url, driver):
    return info

def save_into_db(data):
    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('US')
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

save_to_united_states()