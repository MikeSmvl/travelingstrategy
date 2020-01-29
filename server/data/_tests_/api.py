import unittest
import os
import sys
from time import sleep

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from helper_class.api_helper import ApiHelper
from helper_class.url_helper import UrlHelper
from lib.config import currency_api_link, united_nations_api_link, emergency_url

class TestApiHelper(unittest.TestCase):

    def test_broken_api(self):
        """
        Test that uses the api helper to check if an invalid link will raise an exception
        """
        with self.assertRaises(Exception):
            ApiHelper('https://')

    def test_currency_api(self):
        """
        Test that uses one of our API links (currency) to make sure it returns a valid HTML code.
        The expected response code is 200 as the endpoint should be up.
        """
        try:
            country = 'CA' # Test specific country (Canada)
            url_converter = UrlHelper(currency_api_link)
            information_link = url_converter.get_currency_api(country)

            api_no_country = ApiHelper(currency_api_link)
            api_with_country = ApiHelper(information_link)

            error_code = api_no_country.get_code()
            self.assertEqual(str(error_code), '<Response [400]>')

            success_code = api_with_country.get_code()
            self.assertEqual(str(success_code), '<Response [200]>')
        except Exception:
            self.fail("Api link raised an exception!")

    def test_un_api(self):
        """
        Test that uses one of our API links (united nations) to make sure it returns a valid HTML code.
        The expected response code is 200 as the endpoint should be up.
        """
        try:
            api = ApiHelper(united_nations_api_link)
            code = api.get_code()

            self.assertEqual(str(code), '<Response [200]>')
        except Exception:
            self.fail("Api link raised an exception!")

    def test_emergency_page(self):
        """
        Test that uses one of our API links (http://chartsbin.com/view/1983) to make sure it returns a valid HTML code.
        The expected response code is 200 as the endpoint should be up.
        """
        try:
            api = ApiHelper(emergency_url)
            code = api.get_code()

            self.assertEqual(str(code), '<Response [200]>')
        except Exception:
            self.fail("Api link raised an exception!")

if __name__ == '__main__':
    unittest.main()
