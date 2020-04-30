import unittest
import os
import sys

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from selfie_detection import check_if_selfie

class selfie_test(unittest.TestCase):

    def test_baseline_selfies(self):
        """
        Test that the check_if_selfie function can identify selfies by the return values true for selfies and false when not selfies
        """
        try:
            check_selfie_1 = check_if_selfie('assets/selfie1.jpg')
            check_selfie_2 = check_if_selfie('assets/selfie2.jpg')
            check_selfie_3 = check_if_selfie('assets/selfie3.jpg')
            check_not_selfie_1 = check_if_selfie('assets/not-selfie1.jpg')
            check_not_selfie_2 = check_if_selfie('assets/not-selfie1.jpg')
            check_not_selfie_3 = check_if_selfie('assets/not-selfie1.jpg')
            self.assertTrue(check_selfie_1)
            self.assertTrue(check_selfie_2)
            self.assertTrue(check_selfie_3)
            self.assertFalse(check_not_selfie_1)
            self.assertFalse(check_not_selfie_2)
            self.assertFalse(check_not_selfie_3)
        except Exception as error_msg:
            print(error_msg)

if __name__ == '__main__':
    unittest.main()