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
from lib.config import instagram_url

# so were gonna want to get/do
# 1. the caption C4VMK
# 2. the geolocation, especially if its a restaurant O4GlU
# 3. we need to save, we need to talk about how to make the tablees
# 4. we need to gather images on a time scale (2-7 days for now)

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

def find_a_post(location):
    driver = create_driver()

    url = instagram_url + location + "/"
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'lxml')
    garb_all = soup.find_all('a', {'href':regex.compile(r'/p/')})

    count = 0

    for g in garb_all:
        count += 1
        if count > 10:
            break
        print(count)
        print(g.get('href'))
        count += 1
        u = "https://www.instagram.com"+g.get('href')
        print(u)
        driver.get(u)

        soup = BeautifulSoup(driver.page_source, 'lxml')
        geoloc = soup.find('a',{'class':'O4GlU'})
        caption = soup.find('div', {'class':'C4VMK'})
        img = soup.find('img', {'class':'FFVAD'})

        image_info = {}

        if not geoloc == None:
            print(geoloc.text)
            image_info['geolocation'] = geoloc.text
        if not caption == None:
            print(caption.text)
            image_info['caption'] = caption.text
        if not img == None:
            print(img.get('alt'))
            image_info['image_link'] = img.get('src')

        save_to_db("images", image_info)

    quit_driver(driver)

# saving function
def save_to_db(tableName,image_info):
    image_link = image_info['caption']
    geolocation = image_info['geolocation']
    caption = image_info['caption']
    DB.drop(tableName)
    DB.add_table(tableName,image_id="image_id INTEGER PRIMARY KEY", image_link="image_link",
            geolocation="geolocation", cation="caption")
    DB.insert(tableName, "null",image_link, geolocation, caption)

find_a_post("newyork")