import sys
from unittest.mock import MagicMock, Mock
import unittest
import sqlite3
from bs4 import BeautifulSoup

sys.path.append('../')
from instagram_img import get_image_info

sys.path.append('../helper_class/')
from chrome_driver import create_driver, quit_driver

class parseTest(unittest.TestCase):

# Test for gathering images
    def test_get_image_info(self):
        # tests get_all_countries() method
        driver = create_driver()
        img = get_image_info(driver, "https://www.instagram.com/explore/tags/newyork/")
        # Make sure there is text being parsed
        self.assertFalse("", img)

if __name__ == '__main__':
    unittest.main()
