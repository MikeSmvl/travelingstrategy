import sys
from unittest.mock import MagicMock, Mock
import unittest

sys.path.append('../')
from phrases import translateTest

class parseTest(unittest.TestCase):

    def test_translate(self):
        # tests the function requesting a translation from google
        phrase = translateTest()
        self.assertTrue("merci", phrase)

if __name__ == '__main__':
    unittest.main()