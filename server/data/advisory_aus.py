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


#Get the path of all the pages australia has advisory detail on
def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://smartraveller.gov.au/countries/pages/list.aspx'

        #set up the headless chrome driver
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        # create a new chrome session
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(19)
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        reg = regex.compile(r'\/destinations\/\w+-*\w*\/\w+-*\w*')
        table = soup.find('table')
        table_body = table.find('tbody')
        table_rows = table_body.find_all('tr')

        for tr in table_rows:
            cols = tr.find_all('td')
            cols = [ele.text.strip() for ele in cols]

            if (cols[2]==''):
                cols[2]='No advisory from the australian government'


            name = cols[0]
            advisory_text = cols[2]
            a = tr.find('a', attrs = {'href':reg})
            if (a != None):
                href = a['href']
                info[name] = {"href":href,"advisory-text":advisory_text}
    finally:
        driver.close()
        driver.quit()

    return info


#this function is to parse only one country
#after getting its url from
def parse_a_country(url,driver,data_type,next_data_type):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    findheaders = soup.find_all(regex.compile(r'(h4|p)'))
    data_found = False
    data_text = ""
    more_info = regex.compile(r'More information:')
    for ele in findheaders:
        txt = ele.text.strip()
        if (txt == data_type):
            #if we are in the appropriate header
            #else we continue until we find it
            data_found = True

        elif(txt == next_data_type):
            #if we reach a new h3 header we set the bool to false
            #we got all the data that was under the previous h3
            data_found = False

        elif (data_found):
            if not more_info.match(txt):
                data_text += "<p>"+txt

    return data_text

#the two functions below should be puth in chrome driver class
def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(19)
    return driver

def quit_driver(driver):
    driver.quit()

def save_into_db(data):
    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('australia')
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

def save_to_australia():

    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()

    for country in url:
        driver.implicitly_wait(5)
        name = country
        href = url[country].get('href')
        advisory_text = url[country].get('advisory-text')
        link = "https://smartraveller.gov.au{}".format(href,sep='')
        visa_info = parse_a_country(link,driver,'Visas','Other formalities')
        if (visa_info == ''):
            visa_info = "na"
        country_iso = "na"
        data[name] = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}

    data = find_all_iso(data)

    with open('./advisory-aus.json', 'w') as outfile:
        json.dump(data, outfile)

    # save_into_db(data)


# url = 'https://www.smartraveller.gov.au/destinations/americas/colombia'

# #set up the headless chrome driver
# chrome_options = Options()
# chrome_options.add_argument("--headless")
# # create a new chrome session
# driver = webdriver.Chrome(options=chrome_options)
# driver.implicitly_wait(19)
# driver.get(url)

# visas = parse_a_country(url,driver,'Visas','Other formalities')
# print(visas)
save_to_australia()