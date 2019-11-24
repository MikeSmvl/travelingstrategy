import sys
from unittest.mock import MagicMock, Mock
import unittest
import sqlite3
from bs4 import BeautifulSoup

sys.path.append('../')
from advisory_ca import MyBeautifulSoup, get_all_countries, advisory_canada
from advisory_aus import get_url_of_countries, parse_a_country, create_driver, quit_driver
from advisory_nz import get_url_of_countries_nz, create_driver_nz, quit_driver_nz, parse_a_country_visa, parse_a_country_advisory

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

    # Tests for new zealand's parser

    def test_australia_getCountry(self):
        # tests get url
        urls = get_url_of_countries()
        self.assertFalse("", urls)

    def test_parse_advisory(self):
        # tests getting advisory
        driver = create_driver_nz()
        urls = parse_a_country_advisory("https://safetravel.govt.nz/canada", driver)
        quit_driver_nz(driver)
        self.assertFalse("", urls)

    def tests_nz_parse(self):
        # tests parsing visa
        driver = create_driver_nz()
        urls = parse_a_country_visa("https://en.wikipedia.org/wiki/Visa_requirements_for_New_Zealand_citizens", driver)
        quit_driver_nz(driver)
        self.assertFalse("", urls)

if __name__ == '__main__':
    unittest.main()
