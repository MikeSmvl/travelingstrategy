import sqlite3
import re
import pycountry
import numpy as np

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup


#Some countries have link, others are listed and others have links while being listed
def get_canabais_law():
    array_of_country_info = []
    info = {}
    try:
        # this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/Legality_of_cannabis'

        # set up the headless chrome driver
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        # create a new chrome session
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(19)
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')

        # patter of the link to the country page that the href should match
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')

        for tr in table_rows: #each row
            table_columns = tr.find_all('td')
            number_of_columns = len(table_columns)
            country = ""
            languages = [[],[],[],[],[]]
            if(number_of_columns > 0): #Headers don't have column tags
                country = get_country_name(number_of_columns,table_columns[0]) #first column is the country name
            index = 1 # languages start on the second column
            if(number_of_columns > 0): #Headers don't have column tags
                while(index < number_of_columns):
                    li_tags_array = table_columns[index].find_all('li') #For languages displayed as a list
                    a_tags_array = table_columns[index].find_all('a') #For languages displayed as a list

                    if(len(li_tags_array) > 0): #Listed
                        languages.append(get_languages_displayed_in_list(languages, li_tags_array,index))
                    else: #Not Listed
                        languages.append(get_languages_not_displayed_in_list(languages,a_tags_array, table_columns,index))
                    index+=1
            array_of_country_info = get_country_info_object(languages, array_of_country_info, country)
        return(array_of_country_info)

    finally:
        driver.close()
        driver.quit()