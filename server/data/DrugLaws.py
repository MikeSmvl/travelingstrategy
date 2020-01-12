import sqlite3
import re
import pycountry
import numpy as np
from helper_class.chrome_driver import create_driver, quit_driver
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from helper_class.country_names import find_iso_of_country
import copy
from lib.database import Database
from lib.config import sqlite_db


DB = Database(sqlite_db)
def get_countries_canabaislaw():
    try:
        # this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/Legality_of_cannabis'
        driver = create_driver()
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')
        # patter of the link to the country page that the href should match
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')

        canabais_info= {}
        arrayCanabaisInfo = {}
        for tablerow in table_rows:
            table_columns = tablerow.find_all('td')
            if(len(table_columns)>0):
                country_name= table_columns[0].text
                recreational= table_columns[1].text
                medical= table_columns[2].text
                country_iso = find_iso_of_country(country_name)
                canabais_info = {
                    "name":country_name,
                    "iso": country_iso,
                    "canabais-recreational": recreational,
                    "canabais-medical": medical
            }
                arrayCanabaisInfo[country_iso] = canabais_info
        return  arrayCanabaisInfo
    finally:
        driver.close()
        driver.quit()

def get_countries_cocainelaw():
    try:
        # this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/Legal_status_of_cocaine'
        driver = create_driver()
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')
        # patter of the link to the country page that the href should match
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')

        cocaine_info= {}
        arrayCocaineInfo = {}
        for tablerow in table_rows:
            table_columns = tablerow.find_all('td')            
            if(len(table_columns)>0):
                country_name= table_columns[0].text
                cocaine_possession= table_columns[1].text
                cocaine_sale= table_columns[2].text
                cocaine_transport= table_columns[3].text
                cocaine_cultivation= table_columns[4].text
                country_iso = find_iso_of_country(country_name)
                cocaine_info = {
                    "name":country_name,
                    "iso": country_iso,
                    "cocaine-possession": cocaine_possession,
                    "cocaine-sale": cocaine_sale,
                    "cocaine-transport": cocaine_transport,
                    "cocaine-cultivation": cocaine_cultivation
            }
                arrayCocaineInfo[country_iso] = cocaine_info
        return arrayCocaineInfo
    finally:
        driver.close()
        driver.quit()

def get_countries_methaphetaminelaw():
    try:
        # this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/Legal_status_of_methamphetamine'
        driver = create_driver()
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')
        # patter of the link to the country page that the href should match
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')

        methaphetamine_info= {}
        arraymethaphetamineInfo = {}
        for tablerow in table_rows:
            table_columns = tablerow.find_all('td')            
            if(len(table_columns)>0):
                country_name= table_columns[0].text
                methaphetamine_possession= table_columns[1].text
                methaphetamine_sale= table_columns[2].text
                methaphetamine_transport= table_columns[3].text
                methaphetamine_cultivation= table_columns[4].text
                country_iso = find_iso_of_country(country_name)
                methaphetamine_info = {
                    "name":country_name,
                    "iso": country_iso,
                    "methaphetamine-possession": methaphetamine_possession,
                    "methaphetamine-sale": methaphetamine_sale,
                    "methaphetamine-transport": methaphetamine_transport,
                    "methaphetamine-cultivation": methaphetamine_cultivation
            }
                arraymethaphetamineInfo[country_iso] = methaphetamine_info
        return arraymethaphetamineInfo
    finally:
        driver.close()
        driver.quit()

def combine_dictionaries(dict1, dict2, dict3):


    all_drugs = {}
    temp =  copy.deepcopy(dict1)
    temp.update(dict2)
    temp.update(dict3)

    for iso in temp:
         iso = iso
         country_name = temp[iso].get('name')
         canabais_recreational = ""
         canabais_medical = ""
         cocaine_possession = "no information"
         cocaine_sale = "no information"
         cocaine_transport = "no information"
         cocaine_cultivation ="no information"
         methaphetamine_possession = "no information"
         methaphetamine_sale = "no information"
         methaphetamine_transport = "no information"
         methaphetamine_cultivation = "no information"
         if(iso in dict1):
            canabais_recreational = dict1[iso].get('canabais-recreational')
            canabais_medical  = dict1[iso].get('canabais-medical')
         if(iso in dict2):
            cocaine_possession = dict2[iso].get('cocaine-possession')
            cocaine_sale = dict2[iso].get('cocaine-sale')
            cocaine_transport = dict2[iso].get('cocaine-transport')
            cocaine_cultivation = dict2[iso].get('cocaine-cultivation')
         if(iso in dict3):
            methaphetamine_possession = dict3[iso].get('methaphetamine-possession')
            methaphetamine_sale = dict3[iso].get('methaphetamine-sale')
            methaphetamine_transport = dict3[iso].get('methaphetamine-transport')
            methaphetamine_cultivation = dict3[iso].get('methaphetamine-cultivation')
         all_drugs[iso] = {"name":country_name,
                          "iso": iso,  
                          "methaphetamine_possession": methaphetamine_possession,
                          "methaphetamine_sale": methaphetamine_sale,
                          "methaphetamine_transport": methaphetamine_transport,
                          "methaphetamine_cultivation": methaphetamine_cultivation,
                          "cocaine_possession": cocaine_possession,
                          "cocaine_sale": cocaine_sale, 
                          "cocaine_transport": cocaine_transport,
                          "cocaine_cultivation": cocaine_cultivation,  
                          "canabais_recreational": canabais_recreational, 
                          "canabais_medical": canabais_medical
                          }
    return all_drugs

def save_drug_law():
    
    marijuana = get_countries_canabaislaw()
    cocaine = get_countries_cocainelaw()
    methaphetamine = get_countries_methaphetaminelaw()
    DB.drop_table('drug')
    DB.add_table('drug', iso='text', name="text", methaphetamine_possession='text', methaphetamine_sale='text', methaphetamine_transport='text', methaphetamine_cultivation='text', cocaine_possession='text', cocaine_sale='text', cocaine_transport='text', cocaine_cultivation='text', canabais_recreational='text', canabais_medical='text')
    drug_info = combine_dictionaries(marijuana,cocaine, methaphetamine)

    for iso in drug_info:
        country_iso = drug_info[iso].get("iso")
        country_name =  drug_info[iso].get("name")
        methaphetamine_possession =  drug_info[iso].get("methaphetamine_possession")
        methaphetamine_sale =  drug_info[iso].get("methaphetamine_sale")
        methaphetamine_transport =  drug_info[iso].get("methaphetamine_transport")
        methaphetamine_cultivation =  drug_info[iso].get("methaphetamine_cultivation")
        cocaine_possession =  drug_info[iso].get("cocaine_possession")
        cocaine_sale =  drug_info[iso].get("cocaine_sale")
        cocaine_transport =  drug_info[iso].get("cocaine_transport")
        cocaine_cultivation =  drug_info[iso].get("cocaine_cultivation")
        canabais_recreational =  drug_info[iso].get("canabais_recreational")
        canabais_medical =  drug_info[iso].get("canabais_medical")

        DB.insert('drug', country_iso, country_name, methaphetamine_possession, methaphetamine_sale, methaphetamine_transport, methaphetamine_cultivation, cocaine_possession, cocaine_sale, cocaine_transport, cocaine_cultivation, canabais_recreational, canabais_medical)

if __name__ == '__main__':
    save_drug_law()



    