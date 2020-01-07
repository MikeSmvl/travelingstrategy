import sqlite3
import re
import pycountry
import numpy as np
from helper_class.chrome_driver import create_driver, quit_driver
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from helper_class.country_names import find_iso_of_country

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
        arrayCanabaisInfo = []
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
            arrayCanabaisInfo.append(canabais_info)
            return arrayCanabaisInfo
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
        arrayCocaineInfo = []
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
            arrayCocaineInfo .append(cocaine_info)
            return arrayCocaineInfo
    finally:
        driver.close()
        driver.quit()

    

if __name__ == "__main__":
    get_countries_canabaislaw()
    get_countries_cocainelaw()