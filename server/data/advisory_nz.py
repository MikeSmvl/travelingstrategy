import sqlite3
import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_all_iso
from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.wiki_visa_parser import wiki_visa_parser

def get_url_of_countries_nz(driver):
    info = {}
    try:
        #this is the link to the first page
        url = 'https://safetravel.govt.nz/travel-advisories-destination'

         #set up the headless chrome driver
        driver = create_driver()
        driver.get(url)
       
        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        reg = regex.compile(r'\w+-*')
        table = soup.find('table')
        table_body = table.find('tbody')
        table_rows = table_body.find_all('tr')

        for tr in table_rows:
            cols = tr.find_all('td')
            cols = [ele.text.strip() for ele in cols]

            name = cols[1]
            a = tr.find('a', attrs = {'href':reg})
            info[name] = {"href":a['href']}

    finally:
        driver.close()
        driver.quit()

    return info


def save_to_new_zealand():
    driver = create_driver()
    
    data = {} #Used to store of all the parsed data of each country
    url = get_url_of_countries_nz(driver) #this function create its own driver -- to change
    wiki_visa_url = "https://en.wikipedia.org/wiki/Visa_requirements_for_New_Zealand_citizens"
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver) 
    visas = wiki_visa_ob.visa_parser_table()# Used to acquire visa info of each country
    
    counter_country = 0
    for country in url: #iterates through urls to retrieve advisory information
        driver.implicitly_wait(5)
        name = country
        href = url[country].get("href")

        link = "https://safetravel.govt.nz/{}".format(href,sep='')
        advisory = parse_a_country_advisory(link,driver) 

        visa_text= ""
        for countryVisa in visas: # iterates through list of visas to retrieve visas
            if(countryVisa ==  country):
               visa_text = visas[countryVisa].get('visa')
               del visas[countryVisa]
               break;

        country_iso = "na"
        data[name] = {'country-iso':country_iso,'name':name,'advisory-text':advisory,'visa-info':visa_text}
        

        if ((counter_country%50) == 0):
            quit_driver(driver)
            driver = create_driver()
        counter_country += 1
      
    data = find_all_iso(data)#Sets iso for each country

    with open('./advisory-nz.json', 'w') as outfile:
        json.dump(data, outfile)

    save_into_db(data)



def parse_a_country_advisory(url, driver):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    warning = " "
    for tag in soup.findAll('i'):
      if tag.parent.name == 'h1':
          warning = tag.parent.text.strip()

    return warning


def save_into_db(data):
    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('NZ')
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

