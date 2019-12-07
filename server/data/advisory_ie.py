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
import helper_class.chrome_driver as driver

def find_all_url():

    url_to_all = {}
    my_driver = driver.create_driver()
    url_main = 'https://www.dfa.ie/travel/travel-advice/'
    my_driver.get(url_main)
    soup = BeautifulSoup(my_driver.page_source, 'lxml')

    reg = regex.compile(r'\/travel\/travel-advice\/a-z-list-of-countries\/\w+\/')
    a = soup.findAll('a', attrs = {'href':reg})
    for name in a:
        href = "https://www.dfa.ie"+name['href']
        url_to_all[name.text]={"href":href}


    return url_to_all

def get_one_advisory(url):

    my_driver = driver.create_driver()
    my_driver.get(url)
    soup = BeautifulSoup(my_driver.page_source, 'lxml')

    reg = regex.compile(r'shaded\ssecurity-status\s\w+')
    section = soup.find('section', attrs = {'class':reg})
    advisory = section['class'][2]
    advisory_text = ""

    if (advisory == 'normal'):
        advisory_text = "Normal precautions"
    elif (advisory == 'high-caution'):
        advisory_text = "High degree of caution"
    elif (advisory == 'avoid'):
        advisory_text = "Avoid non-essential travel"
    elif (advisory == 'do-not'):
        advisory_text = "Do not travel"
    else:
        advisory_text = "No advisory"

    return advisory_text;

def get_one_visa(url,to_find):

    my_driver = driver.create_driver()
    my_driver.get(url)
    soup = BeautifulSoup(my_driver.page_source, 'lxml')
    par = soup.find_all(regex.compile(r'(p|strong|h3)'))
    re_txt = regex.compile(to_find,regex.IGNORECASE)
    data_found = False
    data_not_to_save = False
    data = ""

    for p in par:
        txt = p.text
        if (re_txt.search(txt)):
            data_not_to_save  = True

        elif ((p.name == 'p' or p.name == 'h3') and data_found):
            if(len(p.find_all('strong')) > 0):
                data_found = False
                break

        if (data_not_to_save):
            data_found = True
            data_not_to_save = False

        elif (data_found):
            data = data + txt

    print(data)

