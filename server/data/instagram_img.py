#!/usr/bin/python
# -*- coding: utf-8 -*-

#https://www.promptcloud.com/blog/how-to-scrape-instagram-data-using-python/
import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database


def find_images(tag):
    driver = create_driver()
    url = "https://www.instagram.com/explore/tags/"+tag+"/"
    driver.get(url)
    soup=BeautifulSoup(driver.page_source, 'lxml')
    img = soup.find_all('img', {'class':'FFVAD'})
    count = 0
    for i in img:
        count += 1
        #what instagram recognition think is in the photo
        print(count)
        print(i.get('alt'))
        #link to the photo
        print(i.get('src'),"\n")


    quit_driver(driver)

find_images("montreal")