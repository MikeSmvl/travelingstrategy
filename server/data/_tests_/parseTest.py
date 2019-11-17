import sys
from unittest.mock import MagicMock, Mock
import unittest
import sqlite3
from bs4 import BeautifulSoup

sys.path.append('../')
from advisory_ca import MyBeautifulSoup, get_all_countries, advisory_canada

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
        self.assertFalse("", all_data)

    # # Tests for australia's parser

    # def test_australia_getCountry(self):
    #     # tests getting the correct url of the countries
    #     get_url_of_countries()
    #     self.assertEqual(true,true)

    # def test_australia_parse(self):
    #     # tests parsing a single country
    #     parse_a_country(url,driver,data_type)
    #     self.assertEqual(true,true)

if __name__ == '__main__':
    unittest.main()