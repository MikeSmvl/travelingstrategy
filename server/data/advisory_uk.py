from bs4 import BeautifulSoup
import regex
from helper_class.chrome_driver import create_driver
from helper_class.chrome_driver import quit_driver

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

def parse_country_advisory():
    urls = get_url_of_countries()
    print(urls)



def translate_text(text, dest_language="en"):
    translator = Translator()
    try:
        translation = translator.translate(text=text, dest=dest_language)
    except json.decoder.JSONDecodeError:
        # api call restriction
        process = subprocess.Popen(["nordvpn", "d"], stdout=subprocess.PIPE)
        process.wait()
        process = subprocess.Popen(["nordvpn", "c", "canada"], stdout=subprocess.PIPE)
        process.wait()
        return Process_Data.translate_text(text=text, dest_language=dest_language)
    return translation

if __name__ == '__main__':
    parse_country_advisory()