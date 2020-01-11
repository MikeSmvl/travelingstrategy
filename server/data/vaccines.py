from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver, quit_driver
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser
from lib.database import Database

def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://wwwnc.cdc.gov/travel/destinations/list'

        driver = create_driver()
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        countries_div = soup.findAll("div", {"class": "card-body"})[2]
        print(countries_div)
        countries = countries_div.find_all('a')

        #retrieving links for all countries
        for country in countries:
            country_name = country.text
            country_iso = find_iso_of_country(country_name)
            if(country_iso != ""): #Countries that don't have iso are not official counntries
                href = country['href']
                info[country_iso] = {"href":href}
                print(country_name)
    finally:
        driver.close()
        driver.quit()

    # return info

get_url_of_countries()