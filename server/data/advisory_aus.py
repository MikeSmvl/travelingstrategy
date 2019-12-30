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
from helper_class.wiki_visa_parser import wiki_visa_parser


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
def parse_a_country(url,driver,data_type):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    findheaders = soup.find_all(regex.compile(r'(h4|p|div)'))
    data_found = False
    data_text = ""
    previous_text = ""
    more_info = regex.compile(r'More information:')
    count = 0
    for ele in findheaders:
        txt = ele.text.strip()
        if (txt == data_type):
            #if we are in the appropriate header
            #else we continue until we find it
            data_found = True

        elif((ele.name == 'div') & data_found):
            count += 1
            #if we reach a new h3 header we set the bool to false
            #we got all the data that was under the previous h3
            if count == 2:
                data_found = False
                count = 0

        elif (data_found):
            if not more_info.match(txt):
                if not (txt == previous_text):
                    data_text += "<br>"+txt
                    previous_text = txt

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
    sqlite = sqlite_advisories('AU')
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

#unsafe areas
def regional_advice_level(driver,url):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    data_type = "Advice levels"
    soup=BeautifulSoup(driver.page_source, 'lxml')
    findheaders = soup.find_all(regex.compile(r'(h2|p|div)'))
    data_found = False
    data_text = ""
    previous_text = ""
    count = 0
    for ele in findheaders:
        txt = ele.text.strip()
        if (txt == data_type):
            #if we are in the appropriate header
            #else we continue until we find it
            data_found = True

        elif((ele.name == 'h2') & data_found):
            data_found = False

        elif ((ele.name == 'p') & data_found):
            data_text += "<br>"+txt
            previous_text = txt

    return data_text



def save_to_australia():

    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()
    wiki_visa_url = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Australian_citizens'
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
    wiki_visa = wiki_visa_ob.visa_parser_table()

    for country in url:
        driver.implicitly_wait(5)
        name = country
        href = url[country].get('href')
        advisory_text = url[country].get('advisory-text')
        link = "https://smartraveller.gov.au{}".format(href,sep='')
        visa_info = parse_a_country(link,driver,'Visas')
        if (visa_info == ''):
            try:
                visa_info = wiki_visa[name].get('visa')+ "<br>" + visa_info
            except:
                print(name)
        country_iso = "na"
        data[name] = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}
    driver.quit()
    data = find_all_iso(data)

    save_into_db(data)

def all_unsafe_areas():
    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()

    for country in url:
        href = url[country].get('href')
        link = "https://smartraveller.gov.au{}".format(href,sep='')

        unsafe_areas = regional_advice_level(driver,link)
        data[country] = {'unsafe_areas':unsafe_areas}
        print(data[country])

    data = find_all_iso(data)
    driver.quit()
    #saving the data in json file
    with open('unsafe-areas-au.json', 'w') as fp:
        json.dump(data, fp)


all_unsafe_areas()



