import unittest
import os
import sys
from time import sleep

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from helper_class.api_helper import ApiHelper
from lib.config import currency_api_link

class TestApiHelper(unittest.TestCase):

    def test_broken_api(self):
        """
        Test that uses the api helper to check if an invalid link will raise an exception
        """
        with self.assertRaises(Exception):
            ApiHelper('https://')

    def test_working_api(self):
        """
        Test that uses one of our API links to make sure it returns a valid HTML code.
        The expected response code is 400 as a specific country is not given.
        """
        try:
            api = ApiHelper(currency_api_link)
            code = api.get_code()
            self.assertEqual(str(code), '<Response [400]>')
        except Exception:
            self.fail("Api link raised an exception!")

if __name__ == '__main__':
    unittest.main()
