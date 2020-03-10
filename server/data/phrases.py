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

country_language = {
    'GE': ['ru','Russian'],
    'AF': ['ps','Pashto'],
    'AL': ['sq','Albanian'],
    'DZ': ['ar','Arabic'],
    'AD': ['ca','Catalan'],
    'AO': ['pt','Portuguese'],
    'AG': ['en','English'],
    'AR': ['es','Spanish'],
    'AM': ['hy','Armenian'],
    'AU': ['en','English'],
    'AT': ['de','German'],
    'AZ': ['az','Azerbaijani'],
    'BS': ['en','English'],
    'BH': ['ar', 'Arabic'],
    'BD': ['bn', 'Bengali'],
    'BB': ['en','English'],
    'BY': ['be','Belarusian'],
    'BY': ['ru','Russian'],
    'BE': ['nl','Dutch'],
    'BE': ['fr','French'],
    'BZ': ['en','English'],
    'BJ': ['fr','French'],
    'BT': ['dz','Dzongkha'],
    'BO': ['es','Spanish'],
    'BA': ['bs','Bosnian'],
    'BW': ['en','English'],
    'BR': ['pt','Portuguese'],
    'BN': ['ms','Malay'],
    'BG': ['bg','Bulgarian'],
    'BF': ['fr','French'],
    'BI': ['fr','French'],
    'KH': ['km','Khmer'],
    'CM': ['fr','French'],
    'CM': ['en','English'],
    'CA': ['fr','French'],
    'CA': ['en','English'],
    'CV': ['pt','Portuguese'],
    'CF': ['fr','French'],
    'TD': ['ar','Arabic'],
    'TD': ['fr','French'],
    'CL': ['es','Spanish'],
    'CN': ['zh','Chinese'],
    'CO': ['es','Spanish'],
    'KM': ['ar','Arabic'],
    'CG': ['fr','French'],
    'CR': ['es','Spanish'],
    'HR': ['hr','Croatian'],
    'CU': ['es','Spanish'],
    'CY': ['el','Greek'],
    'CY': ['tr','Turkish'],
    'CZ': ['cs','Czech'],
}

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

def translate(iso_language):
    count = 0
    driver = create_driver()
    for lg in iso_language:
        print(lg)
        for p in PHRASES:
            iso = iso_language[lg]
            p_edit = p.replace(" ","%20")

            url  = 'https://translate.google.com/?sl=en&tl='+iso+'&text='+p_edit
            try:
                driver = create_driver()
                driver.get(url)
                soup = BeautifulSoup(driver.page_source, 'lxml')
            except:
                print("ERRROOOOOR 1:",lg)
                continue

            try:
                translation  = soup.find('span',{'class':'tlid-translation translation'}).text
                pronunciation = soup.find_all('div',{'class':'tlid-transliteration-content transliteration-content full'})[1].text
            except:
                print("ERRROOOOOR 2:",lg)
                translation = "-"
                pronunciation = "-"

            DB.insert('phrases',iso,lg,p,translation,pronunciation)

        count += 1

        if count == 10:
            quit_driver(driver)
            return

    quit_driver(driver)
    return

def save_language_country_mapping():
    DB.drop_table("language_iso")
    DB.add_table("language_iso", country_iso = "text", language_iso="text",language="text")
    for country_iso in country_language:
        l = country_language[country_iso]
        language_iso = l[0]
        language = l[1]
        DB.insert("language_iso",country_iso,language_iso,language)

def prep_to_pars():
    res = DB.query("SELECT language_iso FROM phrases")

    data = res.fetchall()
    all_parsed = []
    to_pars = {}
    for d in data:
        iso = d[0]
        if not iso in all_parsed:
            all_parsed.append(iso)

    for c in country_language:
        l = country_language[c]
        iso = l[0]
        language = l[1]
        if not iso in all_parsed:
            to_pars[language] = iso

    return to_pars

# to_pars = prep_to_pars()
# translate(to_pars)
save_language_country_mapping()