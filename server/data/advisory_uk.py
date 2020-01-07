from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from selenium.webdriver.common.by import By
from lib.database import Database
import time

import json


def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://www.gov.uk/foreign-travel-advice'

        driver = create_driver()
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        countries_div = soup.findAll("div", {"class": "govuk-grid-column-two-thirds"})[1]
        countries = countries_div.findAll('a')

        #retrieving links for all countries
        for country in countries:
            country_name = country.text
            country_iso = find_iso_of_country(country_name)
            if(country_iso != ""): #Countries that don't have iso are not official counntries
                href = country['href']
                info[country_iso] = {"href":href}
    finally:
        driver.close()
        driver.quit()

    return info


def parse_one_country_advisory(url, href):
    driver = create_driver()
    driver.get(url)
    advisory=""
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    advisory_div = soup.find("div", {"class": "gem-c-govspeak govuk-govspeak direction-ltr"})
    advisory_paragraph1 = advisory_div.findAll("p")[0]
    advisory_paragraph2 = advisory_div.findAll("p")[1]
    advisory = advisory_paragraph1.text +" "+advisory_paragraph2.text
    quit_driver(driver)

    return advisory


def parse_all_countries_advisory():
    data = {}
    urls = get_url_of_countries()
    driver = create_driver()

    
    for country in urls:
       
        href = urls[country].get("href")
        link = "https://www.gov.uk{}".format(href,sep='')
        advisory = parse_one_country_advisory(link,href)
        link =  "https://www.gov.uk{}/safety-and-security".format(href,sep='')
        additional_advisory_info = parse_additional_advisory_info(link, driver)
        data[country]= {"advisory": advisory + additional_advisory_info}
    return data

       
#Acquires additional advisory information
def parse_additional_advisory_info(link, driver):
      # time.sleep(1) #prevents error
       #Selenium hands the page source to Beautiful Soup
       driver.get(link)
       soup=BeautifulSoup(driver.page_source, 'lxml')
       warning = " "

       advisories = soup.find('div', {'class': 'gem-c-govspeak govuk-govspeak direction-ltr'})
    
       count = 0
       tag_type =" "

       try:       
          for tag in advisories: 
             #Finds and selects only these sections of advisory info
             if(tag.name == 'h3'):
               if(tag.text.strip().lower() == "crime"):
                 count  = 2
                 tag_type = 'Crime'
               elif(tag.text.strip().lower() == "road travel"):
                 count  = 2
                 tag_type = 'Road travel'
               elif(tag.text.strip().lower() == "local travel"):
                 count  = 2
                 tag_type = 'Local travel'
               elif(tag.text.strip().lower() == "landmines"):
                 count  = 2
                 tag_type = 'Landmines'
             elif(count == 2):
               count = 1
             elif(count == 1):
               warning += '</br>'+ tag_type +" "+ tag.text.strip()
               count = 0

       except : 
           print('No additional information') 
       return warning


def save_to_UK():

    driver = create_driver()
    wiki_visa_url ="https://en.wikipedia.org/wiki/Visa_requirements_for_British_citizens"
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
    visas = wiki_visa_ob.visa_parser_table()
    data = parse_all_countries_advisory()
    info = {}
    array_info = []
    # create an an sqlite_advisory object]
    db = Database("countries.sqlite")
    db.add_table("GB", country_iso="text", name="text", advisory_text="text", visa_info="text")



    for country in visas:
        
        iso = find_iso_of_country(country)
        if(iso != ""):
            try:
                name = country
                advisory = data[iso].get('advisory') #dictionary for the travel advisory is iso{advisory:text}
                visa_info = visas[country].get('visa') #dictionary for visa info is country{visa:text}
                info = {
                    "country_iso" : iso,
                    "name": name,
                    "advisory": advisory,
                    "visa_info": visa_info
                }
                array_info.append(info)
                db.insert("GB",iso,name,advisory,visa_info)
                #sqlite.new_row(iso,name,advisory,visa_info)
            except KeyError:
                print("This country doesn't have advisory info: ",country)
                print("Its ISO is: ",iso)

    db.close_connection()
    #sqlite.commit()
    #sqlite.close()

    with open('./advisory-uk.json', 'w') as outfile:
        json.dump(array_info, outfile)

#save_to_UK()
