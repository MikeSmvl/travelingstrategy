import sys
from unittest.mock import MagicMock, Mock
import unittest
import sqlite3
from bs4 import BeautifulSoup


#sys.path.append('../') #mac
sys.path.append('server/data') #pc
from drugs import get_countries_canabaislaw
from drugs import get_countries_cocainelaw
from drugs import get_countries_methaphetaminelaw


class parseTest(unittest.TestCase):
 
    def test_country_canabaislaw(self):
        # tests get_countries_canabaislaw() method
        CanabaisInfo = get_countries_canabaislaw()
        # tests to make sure the returned dictionary is not empty
        self.assertFalse("", CanabaisInfo)
    
    def test_country_cocainelaw(self):
        # tests get_countries_cocainelaw() method
        CocaineInfo = get_countries_cocainelaw()
        # tests to make sure the returned dictionary is not empty
        self.assertFalse("", CocaineInfo)
    
    def test_country_methaphetaminelaw(self):
        # tests get_countries_methaphetaminelaw() method
        MethaphetamineInfo = get_countries_methaphetaminelaw()
        # tests to make sure the returned dictionary is not empty
        self.assertFalse("", MethaphetamineInfo)


if __name__ == '__main__':
    unittest.main()