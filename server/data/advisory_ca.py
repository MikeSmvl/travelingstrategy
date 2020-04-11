import urllib.request, json, urllib.error
import contextlib
from html.parser import HTMLParser
import sqlite3
from bs4 import BeautifulSoup
import regex
import time
from retry import retry
from lib.database import Database
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.chrome_driver import create_driver, quit_driver
from bs4 import BeautifulSoup
from helper_class.flags import Flags
from helper_class.logger import Logger

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

DB = Database("countries.sqlite")
#in the file provided h3 is a sign that a new data type starts
#if the header list is empty then the data is still part of the
#previous h3
def p_with_h3(text):
    header = text.find_all(regex.compile('h3'))
    if (len(header)>0):
        return True
    return False

#Uses beaustiful soup to get the information of a particular subject
#for example data_type = "Visas"
#The data type is contained in a h3 header
def MyBeautifulSoup(entry_exit_html, data_type):
    data_text = ''
    soup = BeautifulSoup(entry_exit_html,'lxml')

    header = soup.find_all(regex.compile(r'(h[1-5]|p)'))
    data_found = False

    for ele in header:

        if (ele.text.strip() == data_type):
            #if we are in the appropriate header
            #else we continue until we find it
            data_found = True

        elif(ele.name == 'h3'):
            #if we reach a new h3 header we set the bool to false
            #we got all the data that was under the previous h3
            data_found = False

        elif (p_with_h3(ele)):
            #sometimes h3 is inside another p element
            data_found = False

        elif (data_found):
            br = ele.find_all('br')
            for e in br:
                #if replacing </br> by <br> does not work with sqlite
                #we can do " " and take care of it in the front end
                e.replace_with("<br>")
            data_text += "<br>"+ele.text.strip()

    return data_text


#get the name and abreviation of all countries
#the canadian gotv has data on
def get_all_countries():
    all_countries = {}
    with urllib.request.urlopen("https://data.international.gc.ca/travel-voyage/index-alpha-eng.json") as url:
        all_countries = json.loads(url.read().decode())
        all_countries = all_countries['data']
        all_countries = all_countries.keys()
    return all_countries

#gets the url for each country
#calls parse_additional_advisory_info and passes url
def get_additional_advisory_info_url():

    url = 'https://travel.gc.ca/travelling/advisories'
    #set up the headless chrome driver
    driver = create_driver()
    driver.get(url)
    soup=BeautifulSoup(driver.page_source, 'lxml')

    table = soup.find('table')
    table_body = table.find('tbody')
    table_rows = table_body.find_all('tr', attrs={'class':'gradeX'})
    additional_advisory = {}
    for row in table_rows:
        cols = row.find_all('td')
        country = cols[0].text
        iso = find_iso_of_country(country)
        advisory = cols[2].text
        additional_advisory[iso] = {'country_name':country, 'advisory_text':advisory}

    quit_driver(driver)
    return additional_advisory

#Acquires additional advisory information
def parse_additional_advisory_info(url, driver):
       #time.sleep(1) #prevents error
       #Selenium hands the page source to Beautiful Soup
       driver.get(url)
       soup=BeautifulSoup(driver.page_source, 'lxml')
       warning = "<ul>"
       advisory_list = soup.find("div", {"class": "tabpanels"})
       security_list = advisory_list.find("details", {"id": "security"})
       advisories = security_list.find("div", {"class": "tgl-panel"})
       count = 0
       tag_type =""
       for tag in advisories:

          #Finds and selects only these sections of advisory info
          if(tag.name == 'h3'):
            if(tag.text.strip().lower() == "crime"):
              count  = 1
              tag_type = '<li><b>Crime</b>'
            elif(tag.text.strip().lower() == "kidnapping"):
              count  = 1
              tag_type = '<li><b>Kidnapping</b>'
            elif(tag.text.strip().lower() == "landmines"):
              count  = 1
              tag_type = '<li><b>Landmines</b>'
            elif(tag.text.strip().lower() == "terrorism"):
              count  = 1
              tag_type = '<li><b>Terrorism</b>'
          elif(count == 1):
            warning += tag_type +" "+ tag.text.strip()
            count = 0
       return warning +'</ul>'



#opens the url to the files of all countries
#get the requiered data and stores it in a dictionary
# @retry(Exception, tries=4)
def advisory_canada(all_countries):
    countries_data = {}
    additional_advisory_info = get_additional_advisory_info_url()
    for key in all_countries:
        country_url = "https://data.international.gc.ca/travel-voyage/cta-cap-{}.json".format(key,sep='')

        print(country_url)
        # time.sleep(5)
        with contextlib.closing(urllib.request.urlopen(country_url)) as url:
            country_data = json.loads(url.read().decode())
            country_data = country_data['data']
            country_iso = key
            country_eng = country_data['eng']
            name = country_eng['name']
            print (name, "   ", country_iso,"  ")
            if(country_iso in additional_advisory_info):
              additional_advisory_info[country_iso]
              advisory_text = additional_advisory_info[country_iso]
            else:
             advisory_text = country_eng['advisory-text']
            entry_exit_html = country_eng.get('entry-exit')
            visa_info = MyBeautifulSoup(entry_exit_html,"Visas")
            #print(visa_info)
            info = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}
            countries_data[name]=info
    return countries_data

#save the data from the returned dicionary in a json file
#and in the sqlite db
def save_to_canada():

    db = Database("countries.sqlite")
    db.drop_table("CA")
    db.add_table("CA", country_iso="text", name="text", advisory_text="text", visa_info="text")
    LOGGER.info('Saving CA table into the databse')
    #getting the data from all countries
    all_countries = get_all_countries()
    countries_data = advisory_canada(all_countries)

    #saving the data in db
    try:
      for country in countries_data:
          iso = countries_data[country].get('country-iso')
          name = countries_data[country].get('name')
          advisory = countries_data[country].get('advisory-text')
          visa = countries_data[country].get('visa-info')
          LOGGER.info(f'Saving {name} into the CA table')
          db.insert("CA",iso,name,advisory,visa)
          LOGGER.success(f'{name} was successfully saved into the CA table with the following table: {advisory}. {visa}')
      LOGGER.success('CA table was successfully saved into the database')
    except Exception as error_msg:
      LOGGER.error(f'An error has occurred while saving the countries into the CA table because of the following error: {error_msg}')
    db.close_connection()


def update_advisory():
    advisory_info = get_additional_advisory_info_url()
    for iso in advisory_info:
        iso_info = advisory_info[iso]
        text = iso_info['advisory_text']
        DB.update(f"CA" , f"country_iso = '{iso}'" ,f"advisory_text = '{text}'")
        LOGGER.info(f'Update thed advisory for: {iso}')

update_advisory()