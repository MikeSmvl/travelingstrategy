from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver
from helper_class.chrome_driver import quit_driver
from helper_class.sqlite_advisories import sqlite_advisories


# Used to translate using the googletrans library
import json


def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://www.gov.uk/foreign-travel-advice'

        driver = create_driver()
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        countries_div = soup.findAll("div", {"class": "govuk-grid-column-two-thirds"})[0]
        countries = countries_div.findAll('a')

        #retrieving links for all countries
        for country in countries:
            country_name = country.text
            href = country['href']
            info[country_name] = {"href":href}
    finally:
        driver.close()
        driver.quit()

    return info


def parse_one_country_advisory(url):
    driver = create_driver()
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    advisory_div = soup.find("div", {"class": "application-notice help-notice"})
    advisory_p_tag = advisory_div.find("p")
    advisory = advisory_p_tag.decode_contents() #This will keep the a tag so that the embassy info is displayed

    return advisory


def save_to_db():
    advisory = parse_one_country_advisory("https://www.gov.uk/foreign-travel-advice/{}/travel-advice-help-and-support".format('afghanistan',sep=''))

    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('GB')
    sqlite.delete_table()
    sqlite.create_table()
    # for country in data:
        # iso = data[country].get('country-iso')
        # name = data[country].get('name')
        # text = data[country].get('advisory-text')
        # visa_info = data[country].get('visa-info')
    iso = 'AF'
    name = 'Afghanistan'
    text = advisory
    visa_info = ""
    sqlite.new_row(iso,name,text,visa_info)
    sqlite.commit()
    sqlite.close()


if __name__ == '__main__':
    save_to_db()