from bs4 import BeautifulSoup
import string
# import regex
from helper_class.chrome_driver import create_driver, quit_driver
# from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser

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
            country_name = country.text
            country_iso = find_iso_of_country(country_name)
            if(country_iso != ""): #Countries that don't have iso are not official counntries
                href = country['href']
                dictionnary[country_iso] = {"href":href}
    finally:
        driver.close()
        driver.quit()
    return dictionnary

def get_url_of_all_countries():
    countries_url = {}
    alphabet = list(string.ascii_lowercase) #The urls are separeted by alphabet letters
    for letter in alphabet:
        get_url_of_for_letter(countries_url,letter)

    return countries_url

def save_to_SG():
    driver = create_driver()
    wiki_visa_url ="https://en.wikipedia.org/wiki/Visa_requirements_for_Singaporean_citizens"
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
    visas = wiki_visa_ob.visa_parser_table()
    info = {}
    array_info = []

    for country in visas:
        iso = find_iso_of_country(country)
        visa_info = visas[country].get('visa')
        info = {
                "country_iso" : iso,
                "visa_info": visa_info
                }
        array_info.append(info)

    print(array_info)

    quit_driver(driver)
if __name__ == '__main__':
    print(get_url_of_all_countries())
    # save_to_SG()