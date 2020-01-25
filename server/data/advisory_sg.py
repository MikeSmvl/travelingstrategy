from bs4 import BeautifulSoup
import string
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
import json
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import wiki_visa_url_SG
from lib.database import Database

"""The Singaporian page orders the countries
    alphabetcally and has a page for each letter.
    This method returns the urls for every country
    that start with a given letter.
"""
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

def get_url_of_for_letter(dictionnary, letter):
    try:
        #this is the link to the first page
        url = 'https://www.mfa.gov.sg/Where-Are-You-Travelling-To?letter={}'.format(letter,sep='')

        driver = create_driver()
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')
        #All countries for a given letter
        countries = soup.findAll("a", {"class": "embassy-dropdown"})

        # #retrieving links for all countries of the alphabet
        for country in countries:
            country_name = country.text.lstrip().rstrip()
            country_iso = find_iso_of_country(country_name)
            if(country_iso != ""): #Countries that don't have iso are not official counntries
                href = country['href']
                dictionnary[country_name] = {"href":href}
    finally:
        driver.close()
        driver.quit()
    return dictionnary

def get_url_of_all_countries():
    LOGGER.info('Retrieving the URLs for all countries for the Singapore advisory')
    countries_url = {}
    alphabet = list(string.ascii_lowercase) #The urls are separeted by alphabet letters
    try:
        for letter in alphabet:
            get_url_of_for_letter(countries_url,letter)
        LOGGER.success('URLs of all countries have been successfully retrieved for the Singapore advsory')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured while retrieving the URLs of all countries for the Singapore advisory because of the following error: {error_msg}')
    return countries_url


 #Taking the first paragraph of the safety & security section
def parse_one_country_advisory(url):
    driver = create_driver()
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    advisory_paragraph1=""

    try: #The html are made differently for certain countries pages
        advisory_div = soup.findAll("div", {"class": "acc-content ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active"})[1]
        advisory_paragraph = advisory_div.findAll("span")[0].text
        advisory_paragraph1 = advisory_paragraph.split('\n')[0]
    except IndexError:
        try:
            advisory_div = soup.findAll("div", {"class": "acc-content ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active"})[1]
            advisory_paragraph = advisory_div.findAll("p")[0].text
            advisory_paragraph1 = advisory_paragraph.split('\n')[0]
        except IndexError:
            try:
                advisory_div = soup.findAll("div", {"class": "acc-content ui-accordion-content ui-corner-bottom ui-helper-reset ui-widget-content ui-accordion-content-active"})[1]
                advisory_paragraph = advisory_div.text
                advisory_paragraph1 = advisory_paragraph.split('\n')[1]
            except IndexError:
                try:
                    advisory_div = soup.findAll("div", {"class": "alert-section"})[0]
                    advisory_paragraph = advisory_div.findAll("p")[0].text
                    advisory_paragraph1 = advisory_paragraph.split('\n')[0]
                except IndexError:
                    advisory_div = soup.findAll("div", {"class": "space"})[0]
                    advisory_paragraph = advisory_div.findAll("p")[1].text
                    advisory_paragraph1 = advisory_paragraph.split('\n')[0]

    advisory_paragraph1 = advisory_paragraph1.lstrip()
    LOGGER.info({advisory_paragraph1})
    quit_driver(driver)

    return advisory_paragraph1

def parse_all_countries_advisories():
    LOGGER.info(f'Beginning parsing for all countries for Singapore advisory')
    data = {}
    countries_url = get_url_of_all_countries()
    for country in countries_url:
        LOGGER.info(f'parsing for {country}')
        href = countries_url[country].get("href")
        link = "https://www.mfa.gov.sg{}".format(href,sep='')
        try:
            advisory = parse_one_country_advisory(link)
            data[country]= {"advisory": advisory}
        except IndexError as e:
            LOGGER.warning(f'This country doesn’t have advisory info {country} because of {e}')
            LOGGER.info(f'Link : {link}')
    return data

def save_info(db,visas,advisories, array_info):
    LOGGER.info('Saving all countries information into SG table')
    for country in visas:
        try:
            LOGGER.info(f'Saving information for {country}')
            iso = find_iso_of_country(country)
            visa = visas[country].get('visa')
            advisory = advisories[country].get('advisory') #if the country doesn't have advisory info it throws an index error
            info = {
                    "country_iso" : iso,
                    "name": country,
                    "advisory": advisory,
                    "visa_info": visa
                    }
            array_info.append(info)
            LOGGER.info(f'Saving {country} into the SG table')
            db.insert("SG",iso,country,advisory,visa)
            LOGGER.success(f'{country} was sucesfully saved to the database with the following information: {advisory}. {info}')
        except KeyError: #if the country doesn't have advisory info
            LOGGER.warning(f'This country doesn’t have advisory info {country}')
            iso = find_iso_of_country(country)
            visa = visas[country].get('visa')
            advisory = "Not available yet"
            info = {
                    "country_iso" : iso,
                    "name": country,
                    "advisory": advisory,
                    "visa_info": visa
                    }
            array_info.append(info)
            db.insert("SG",iso,country,advisory,visa)
    for country in advisories: #countries that don't have visa info but have advisory info
        if not country in visas:
            LOGGER.warning(f'This country doesn’t have advisory info {country}')
            iso = find_iso_of_country(country)
            visa_info = "Not available yet"
            advisory = advisories[country].get('advisory')
            info = {
                    "country_iso" : iso,
                    "name": country,
                    "advisory": advisory,
                    "visa_info": visa_info
                    }
            array_info.append(info)
            db.insert("SG",iso,country,advisory,visa)
    return array_info

def save_to_SG():
    LOGGER.info(f'Saving Singapore into the databse')
    driver = create_driver()
    LOGGER.info('Parsing visa requirments for all countries into the Singapore table')
    try:
        wiki_visa_url = wiki_visa_url_SG
        wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
        visas = wiki_visa_ob.visa_parser_table()
        LOGGER.success('Visa requirements have been succesfully parsed for the Singapore table')
    except Exception as error_msg:
        LOGGER.error(f'An error has occured whilse parsing for visa requirements because of the following error: {error_msg}')
    advisories = parse_all_countries_advisories()
    info = {}
    array_info = []

    # create an an sqlite_advisory object
    db = Database("countries.sqlite")
    db.drop_table("SG")
    db.add_table("SG", country_iso="text", name="text", advisory_text="text", visa_info="text")

    array_info = save_info(db,visas,advisories,array_info)

    db.close_connection()
    LOGGER.success(f'Singapore was sucesfully saved to the database')
    quit_driver(driver)

    with open('./advisory-sg.json', 'w') as outfile:
        json.dump(array_info, outfile)

if __name__ == '__main__':
   save_to_SG()