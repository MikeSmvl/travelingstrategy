import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from helper_class.country_names import find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

#Get the path of all the pages australia has advisory detail on
def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://smartraveller.gov.au/countries/pages/list.aspx'
        LOGGER.info('Retrieving the URLs for all countries for the Australian advisory')
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
                LOGGER.success(f'Retrieved URL for {name}')
        LOGGER.success('Successfully retrieved the URLs for all countries of the Australian advisory')
    except:
        LOGGER.error('An error has occured while retrieving the URLs for all countries for the Australian advisory')
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
    try:
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
    except:
        LOGGER.error(f'An error has occured while parsing')
    return data_text

def get_additional_advisory(url,driver):
    extra_advisory = "<ul>"
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    safety_div = soup.find("div", {"class": "safety paragraph paragraph--type--overview paragraph--view-mode--default"})
    safety_ul = safety_div.find("ul")
    safety_paragraphs = safety_ul.find_all("li")
    #each li tag is one paragraph, we will concatinate them
    for paragraph in safety_paragraphs:
        extra_advisory = extra_advisory + '<li>' + paragraph.text
    return extra_advisory+'</ul>'

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
    db = Database("countries.sqlite")
    db.drop_table("AU")
    db.add_table("AU", country_iso="text", name="text", advisory_text="text", visa_info="text")
    LOGGER.info('Saving AU table into the database')
    try:
        for country in data:
            iso = data[country].get('country-iso')
            name = data[country].get('name')
            advisory = data[country].get('advisory-text')
            visa = data[country].get('visa-info')
            LOGGER.info(f'Saving {name} into the AU table')
            db.insert("AU",iso,name,advisory,visa)
            LOGGER.success(f"{name} was succesfully saved in the AU table with the following information: {advisory}. {visa}")
        LOGGER.success('AU was successfully saved into the databse')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while saving {name} into the AU table because of the following error: {error_msg} ')
    db.close_connection()

#unsafe areas
def regional_advice_level(driver,url):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    data_type = "Advice levels"
    soup=BeautifulSoup(driver.page_source, 'lxml')
    div = soup.find_all('div', attrs={'class':'clearfix text-formatted field field--name-field-location field--type-text-long field--label-hidden field__item'})
    data = []
    for ele in div:
        txt = ele.text
        data.append(txt)
        print(txt)
    return data



def save_to_australia():

    LOGGER.info("Begin parsing and saving for Australia table...")
    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()
    try:
        LOGGER.info('Parsing visa requirements for all countries for the Australian advisory')
        wiki_visa_url = 'https://en.wikipedia.org/wiki/Visa_requirements_for_Australian_citizens'
        wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
        wiki_visa = wiki_visa_ob.visa_parser_table()
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while retrieving the visa requirements for all countries for the Australian advisory because of following error: {error_msg}')

    for country in url:
        driver.implicitly_wait(5)
        name = country
        href = url[country].get('href')
        advisory_text = url[country].get('advisory-text')
        link = "https://smartraveller.gov.au{}".format(href,sep='')
        additional_advisory = get_additional_advisory(link,driver)
        advisory_text = advisory_text +additional_advisory
        LOGGER.info(f"Begin parsing {name} to insert into AU table")
        visa_info = parse_a_country(link,driver,'Visas')
        LOGGER.success(f"The following information was retrieved for {name}: {visa_info}. {advisory_text}")
        if (visa_info == ''):
            try:
                visa_info = wiki_visa[name].get('visa')+ "<br>" + visa_info
            except:
                LOGGER.warning(f"No visa info for {name}")
        country_iso = "na"
        data[name] = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}
    driver.quit()
    data = find_all_iso(data)

    save_into_db(data)

def all_unsafe_areas():
    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()
    LOGGER.info('Retrieving all unsafe areas')
    for country in url:
        href = url[country].get('href')
        link = "https://smartraveller.gov.au{}".format(href,sep='')

        unsafe_areas = regional_advice_level(driver,link)
        data[country] = {'unsafe_areas':unsafe_areas}
        LOGGER.info(f'{data[country]}')

    data = find_all_iso(data)
    driver.quit()
    #saving the data in json file
    with open('unsafe-areas-au.json', 'w') as fp:
        json.dump(data, fp)

# save_to_australia()
driver = create_driver()
data = regional_advice_level(driver,"https://www.smartraveller.gov.au/destinations/africa/mali")
quit_driver(driver)

save_to_australia()