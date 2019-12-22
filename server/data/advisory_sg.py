# from bs4 import BeautifulSoup
# import regex
from helper_class.chrome_driver import create_driver, quit_driver
# from helper_class.sqlite_advisories import sqlite_advisories
from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.wiki_visa_parser import wiki_visa_parser

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
    save_to_SG()