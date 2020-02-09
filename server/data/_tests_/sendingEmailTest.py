import sys
from unittest.mock import MagicMock, Mock
import unittest


sys.path.append('../helper_class/')
from email_class import Email

class parseTest(unittest.TestCase):

        
    def test_send_email(self):
        email = Email("subject", "travelingstrategy@gmail.com", "travelingstratgy@gmail.com", "<h1>Hello</h1>")
        # tests get_countries_canabaislaw() method
        x = email.sendEmail('buttSmell2020!')
        # tests to make sure the returned dictionary is not empty
        self.assertFalse("", x)
    
    def test_authentication(self):
        email = Email("subject", "travelingstrategy@gmail.com", "travelingstratgy@gmail.com", "<h1>Hello</h1>")
        # tests get_countries_cocainelaw() method
        x = email.authentication('buttSmell2020!')
        # tests to make sure the returned dictionary is not empty
        self.assertFalse("", x)


if __name__ == '__main__':
    unittest.main()