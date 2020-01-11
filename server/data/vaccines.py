from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import vaccine_url
from lib.database import Database

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

#grabbing the URL for all countries
def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        driver = create_driver()
        driver.get(vaccine_url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        countries_per_letter_array = soup.find_all("ul", {"class": "list-bullet"})
        for countries_per_letter in countries_per_letter_array:
            # print(countries_div)
            countries_given_letter_array = countries_per_letter.find_all('a')

            #retrieving links for all countries
            for country in countries_given_letter_array:
                country_name = country.text
                country_iso = find_iso_of_country(country_name)
                if(country_iso != ""): #Countries that don't have iso are not official counntries
                    href = country['href']
                    info[country_iso] = {"href":href}
                    LOGGER.info(f' Retrieving URL of {country_name}')
    finally:
        driver.close()
        driver.quit()

    return info

#parsing vaccine text for a single country
def parse_one_country_vaccine(url, href):
    driver = create_driver()
    driver.get(url)
    vaccine_text=""
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    # table_row = soup.find_all
    for tr in soup.findAll('tr'):
        for td in tr.findAll('td'):
            vaccine_text = td.text
            print(vaccine_text)

    quit_driver(driver)

    return vaccine_text

#parsing
def parse_all_countries_vaccine():
    data = {}
    urls = get_url_of_countries()

    for country in urls:
        href = urls[country].get("href")
        link = "https://wwwnc.cdc.gov{}".format(href,sep='')
        print(link)
        vaccine = parse_one_country_vaccine(link,href)
        print(vaccine)
        data[country]= {"Vaccine and Medicines": vaccine}
        print(data)

    return data

parse_all_countries_vaccine()