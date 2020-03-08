import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from selenium.webdriver.common.by import By
from helper_class.country_names import find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from lib.config import instagram_url
import datetime

DB = Database('countries.sqlite')

PHRASES = {
    'Thank you',
    'Hello',
    'Goodbye',
    'Excuse me',
    'May I have ...',
    'How much does it cost?',
    'Bathroom',
    'Yes',
    'No',
    'Where is ...',
    'Help',
    'Right',
    'Left',
    'Straight',
    'To Turn ...',
    'Hospital',
    'Ambulance',
    'Police',
    'Help',
    'Entry',
    'Exit'
}

iso_language = {

    'arabic':'ar',
    'japanese':'ja',
    'chinese':'zh',
    'french':'fr',
    'greek':'el'
}

driver = create_driver()
for lg in iso_language:
    for p in PHRASES:
        iso = iso_language[lg]
        p_edit = p.replace(" ","%20")
        url  = 'https://translate.google.com/?sl=en&tl='+iso+'&text='+p_edit

        driver = create_driver()
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, 'lxml')

        try:
            translation  = soup.find('span',{'class':'tlid-translation translation'}).text
            pronunciation = soup.find_all('div',{'class':'tlid-transliteration-content transliteration-content full'})[1].text
        except:
            print("ERRROOOOOR:",lg)
            translation = "-"
            pronunciation = "-"

        DB.insert('phrases',iso,lg,p,translation,pronunciation)

quit_driver(driver)