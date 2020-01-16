import sqlite3
import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from lib.database import Database
from helper_class.flags import Flags
from helper_class.logger import Logger

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

def get_name_and_advisory_of_countries():
    try:
        #this is the link to the first page
        url = 'https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/'
        LOGGER.info("Retrieving URL of all countries for United States")
        #set up the headless chrome driver
        driver = create_driver()
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml') 

        #pattern of the link to the country page that the href should match
        table = soup.find('table')
        table_body = table.find('tbody')
        table_rows = table_body.find_all('tr')

        counter = 0
        info = {}
        for tr in table_rows:
          if(counter != 0):
             cols = tr.find_all('td')
             href = cols[0].find('a').get('href')# gets url for each country that is needed for additional advisory info
             link = "https://travel.state.gov/{}".format(href,sep='')

             cols = [ele.text.strip() for ele in cols]
             nameLength = len(cols[0])-16
             name = cols[0][0:nameLength]
             if(name != 'W'):
               advisory = cols[1]
               advisory += '</br>'+parse_a_country_additional_advisory_info(link,driver) 
             info[name] = advisory
          counter += 1
    finally:
        driver.close()
        driver.quit()

    return info

#Retrieves all the tooltips which contain additional advisory info
def parse_a_country_additional_advisory_info(url, driver):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    warning = " "
    div_id = soup.find("div", {"id": "container tooltipalert"})
    a_tags = div_id.find_all('a')
    for a in a_tags:
        listToStr = ' '.join(map(str, a.get('class'))) 
        if(listToStr == 'showThreat'): #if tooltip is marked as showThreat then this country is marked as having this threat
            if(a.get('title')!='Tool Tip: Other'):
             warning += a.get('data-tooltip').rstrip("\n") +'</br>'
    return warning




def save_to_united_states():

    LOGGER.info("Begin parsing and saving for United States table...")
    driver = create_driver()
    
    data = {} #Used to store of all the parsed data of each country
    name_to_advisories ={} #Stores the names and associated advisories
    name_advisory = get_name_and_advisory_of_countries()
    wiki_visa_url = "https://en.wikipedia.org/wiki/Visa_requirements_for_United_States_citizens"
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
    visas = wiki_visa_ob.visa_parser_table()

    for name in sorted (name_advisory.keys()): #Sorts the dictionary containing  names and advisories
       name_to_advisories[name] = name_advisory[name]


    counter_country = 0
    for country in name_to_advisories: #iterates through name_to_advisories to retrieve advisories
        driver.implicitly_wait(5)
        name = country
        advisory = name_to_advisories[country]

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

    with open('./advisory-us.json', 'w') as outfile:
        json.dump(data, outfile)

    save_into_db(data)



def save_into_db(data):
    # create an an sqlite_advisory object
    db = Database("countries.sqlite")
    db.drop_table("US")
    db.add_table("US", country_iso="text", name="text", advisory_text="text", visa_info="text")

    for country in data:
        iso = data[country].get('country-iso')
        name = data[country].get('name')
        advisory = data[country].get('advisory-text')
        visa = data[country].get('visa-info')
        LOGGER.success(f"Saving {name} into the US table with the following information: {visa}. {advisory}")
        db.insert("US",iso,name,advisory,visa)
        LOGGER.success(f'{name} sucesfully saved to the database.')
    db.close_connection()

save_to_united_states()