from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import vaccine_url
from lib.database import Database

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

#create table
def create_vaccines_table():
    DB.drop_table('vaccines')
    DB.add_table('vaccines', country_iso = "text", vaccine_name = "text", vaccine_info = "text")

#save one country vaccines
#one row is created per vaccines
def save_one_country(data,iso):
    for vaccine in data:
        try:
            DB.insert("vaccines",iso,vaccine,data[vaccine])
            LOGGER.success(f'Sucessfully saved {iso} into vaccines table')
        except Exception as error_msg:
            LOGGER.error(f'Could not save {iso} because of the following error: {error_msg}')

#grabbing the URL for all countries
def get_url_of_countries():
    info = {}
    LOGGER.info('Retrieving URL of all countries for Vaccines table')
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
                    LOGGER.info(f' Retrieving URL of {country_name}, {href}')
    
    except Exception as error_msg:
        LOGGER.error(f'Could not retrieve URLs of countries because of the following error: {error_msg}')
    finally:
        driver.close()
        driver.quit()
    return info

#parsing vaccine text for a single country
def parse_one_country_vaccine(url,country):
    driver = create_driver()
    driver.get(url)
    vaccines={}
    LOGGER.info(f'Parsing the informations for vaccinations for the following country: {country}')
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    # table_row = soup.find_all
    count = 0
    for tbody in soup.findAll('tbody'):
        for row in tbody.findAll('tr'):
            name = row.find('td',{"class": "traveler-disease"})
            info = row.find('td',{"class": "traveler-findoutwhy"})
            if name and info:
                name = name.text.strip('/\n')
                if count == 0:
                    info = info.text.replace('\n','')
                else:
                    info = info.text.replace('\n',' ')
                vaccines[name] = info
                count = count+1

    quit_driver(driver)
    save_one_country(vaccines,country)
    print(vaccines)
    return vaccines

#parsing
def parse_all_countries_vaccine():
    urls = get_url_of_countries()
    create_vaccines_table()
    for country in urls:
        href = urls[country].get("href")
        link = "https://wwwnc.cdc.gov{}".format(href,sep='')
        vaccine = parse_one_country_vaccine(link,country)

parse_all_countries_vaccine()
# get_url_of_countries()
# create_vaccines_table()
# parse_one_country_vaccine("https://wwwnc.cdc.gov/travel/destinations/traveler/none/lebanon",'LB')
