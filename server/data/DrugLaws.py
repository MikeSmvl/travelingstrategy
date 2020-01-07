import sqlite3
import re
import pycountry
import numpy as np
from helper_class.chrome_driver import create_driver, quit_driver
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from helper_class.country_names import find_iso_of_country


#Some countries have link, others are listed and others have links while being listed
def get_countries_canabaislaw():
    array_of_country_info = []
    info = {}
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

        drug_info= {}
        arrayOfDrugInfo = []
        for tablerow in table_rows:
            table_columns = tablerow.find_all('td')
            # country_iso = find_iso_of_country(country_name)
            
            if(len(table_columns)>0):
                country_name= table_columns[0].text
                recreational= table_columns[1].text
                medical= table_columns[2].text
                country_iso = find_iso_of_country(country_name)
                drug_info = {
                     "name":country_name,
                    "iso": country_iso,
                    "recreational": recreational,
                    "medical": medical
            }
            arrayOfDrugInfo.append(drug_info)
            print(arrayOfDrugInfo)
    finally:
        driver.close()
        driver.quit()

if __name__ == "__main__":
    get_countries_canabaislaw()