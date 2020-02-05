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

def find_images(location):
    driver = create_driver()
    url = instagram_url + location + "/"
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'lxml')
    img = soup.find_all('img', {'class':'FFVAD'})
    count = 0
    for i in img:
        count += 1
        # what instagram recognition think is in the photo
        print(count)
        print(i.get('alt'))
        # link to the photo
        print(i.get('src'),"\n")

    quit_driver(driver)

def find_caption(location):
    driver = create_driver()
    url = instagram_url + location + "/"
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'lxml')
    caption = soup.find_all('div', {'class':'C4VMK'})
    count = 0
    print("test")
    for c in caption:
        count += 1
        print(count)
        print(c.get('title'))

    quit_driver(driver)


def find_geolocation(location):
    driver = create_driver()
    url = instagram_url + location + "/"
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'lxml')
    geoloc = soup.find_all('a', {'href':regex.compile(r'/p/')})
    count = 0
    print("test")
    for g in geoloc:
        count += 1
        print(count)
        print(g.get('href'))
        count += 1
        u = "https://www.instagram.com"+g.get('href')
        print(u)
        driver.get(u)
        soup = BeautifulSoup(driver.page_source, 'lxml')
        geoloc = soup.find('a',{'class':'O4GlU'})
        if not geoloc == None:
            print(geoloc.text)

    quit_driver(driver)

# saving function

#find_images("newyork")
#find_caption("newyork")
find_geolocation("newyork")