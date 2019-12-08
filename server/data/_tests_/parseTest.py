import sys
from unittest.mock import MagicMock, Mock
import unittest
import sqlite3
from bs4 import BeautifulSoup

sys.path.append('../')
from advisory_ca import MyBeautifulSoup, get_all_countries, advisory_canada
from advisory_aus import get_url_of_countries, parse_a_country, create_driver, quit_driver
from languages import get_concatinated_values
from advisory_nz import get_url_of_countries_nz, create_driver_nz, quit_driver_nz, parse_a_country_visa, parse_a_country_advisory
from advisory_us import get_name_and_advisory_of_countries, parse_a_country_visa as parse_a_country_visa_us
from advisory_uk import get_url_of_countries as get_url_of_countries_uk, parse_one_country_advisory, parse_all_country_visa
from advisory_ie import find_all_url, get_one_advisory, get_one_info

class parseTest(unittest.TestCase):

    # Tests for canada's parser

    def test_canada_soup(self):
        # tests MyBeautifulSoup() method
        # with Lebanon as a test country
        visa = MyBeautifulSoup("https://data.international.gc.ca/travel-voyage/cta-cap-lb.json", "Visas")
        # tests if it is not empty
        self.assertFalse("", visa)

    def test_canada_getCountry(self):
        # tests get_all_countries() method
        allCountries = get_all_countries()
        # tests to make sure the returned dictionary is not empty
        self.assertFalse("", allCountries)

    def test_canada_adviosry(self):
        # tests advisory_canada() method
        lb = {"AF":"a test"}
        all_data = advisory_canada(lb)
        self.assertFalse({}, all_data)

    # Tests for australia's parser

    def test_australia_getCountry(self):
        # tests getting the correct url of the countries
        urls = get_url_of_countries()
        self.assertFalse("", urls)

    def test_australia_parse(self):
        # tests parsing a single country
        driver = create_driver()
        data = parse_a_country("https://smartraveller.gov.au/Countries/europe/western/Pages/austria.aspx", driver, "Visas")
        quit_driver(driver)
        self.assertFalse("", data)

    # Tests for Language parser

    def test_get_concatinated_values(self):
        # tests comma seperating function
        test_value = ["Charles", "Karl", "Steven"]
        value = get_concatinated_values(test_value)
        self.assertTrue("Charles, Karl, Steven", value)

    # Tests for new zealand's parser

    def test_nz_getCountry(self):
        # tests get url
        urls = get_url_of_countries_nz()
        self.assertFalse("", urls)

    def test_parse_advisory(self):
        # tests getting advisory
        driver = create_driver_nz()
        urls = parse_a_country_advisory("https://safetravel.govt.nz/canada", driver)
        quit_driver_nz(driver)
        self.assertFalse("", urls)

    def tests_nz_parse_visa(self):
        # tests parsing visa
        driver = create_driver_nz()
        urls = parse_a_country_visa("https://en.wikipedia.org/wiki/Visa_requirements_for_New_Zealand_citizens", driver)
        quit_driver_nz(driver)
        self.assertFalse("", urls)

    # Tests for USA's parser

    def test_parse_advisory_us(self):
        # tests getting advisory
        urls = get_name_and_advisory_of_countries()
        self.assertFalse("", urls)

    def tests_us_parse(self):
        # tests parsing visa
        urls = parse_a_country_visa_us()

    # Tests for United Kingdom's parser

    def tests_get_url_of_countries_uk(self):
        # tests get url
        urls = get_url_of_countries_uk()
        self.assertFalse("", urls)

    def test_parse_one_country_uk(self):
        # tests parsing of 1 country, Afghanistan
        urls = parse_one_country_advisory("https://www.gov.uk/foreign-travel-advice/afghanistan", "foreign-travel-advice/afghanistan")
        self.assertFalse("", urls)

    def tests_uk_parse_visa(self):
        # tests parsing visa
        driver = create_driver_nz()
        urls = parse_all_country_visa("https://en.wikipedia.org/wiki/Visa_requirements_for_British_citizens", driver)
        quit_driver_nz(driver)
        self.assertFalse("", urls)

    # Tests for Ireland's parser

    def test_get_urls_ie(self):
        # tests getting the urls fromt the gov't site
        driver = create_driver_nz()
        urls = find_all_url(driver)
        quit_driver_nz(driver)
        self.assertFalse("", urls)

    def test_get_advisory_ie(self):
        # tests getting single advisory
        advis = get_one_advisory(url, my_driver, soup)
        self.assertFalse("", advis)

     def test_get_info_ie(self):
         # tests getting visa info
        my_driver = create_driver;
        my_driver.implicitly_wait(5)
        my_driver.get(url)
        soup = BeautifulSoup(my_driver.page_source, 'lxml')
        info = get_one_info('https://www.dfa.ie/travel/travel-advice/a-z-list-of-countries/canada/', 'visa/passport', my_driver, soup)
        quit_driver(my_driver)
        self.assertFalse("", info)

    def test_ie_parse_visa_wiki(self):
        # tests parsing visa from wiki for ie
        my_driver = create_driver;
        urls = parse_a_country_visa("https://en.wikipedia.org/wiki/Visa_requirements_for_Irish_citizens", my_driver)
        quit_driver_nz(my_driver)
        self.assertFalse("", urls)

if __name__ == '__main__':
    unittest.main()
