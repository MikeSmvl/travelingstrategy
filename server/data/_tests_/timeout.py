import unittest
import os
import sys
from time import sleep

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from helper_class.timeout import timeout

class TestTimeoutDecorator(unittest.TestCase):

    @timeout(1)
    def sleep_for(self, amount):
        sleep(amount)

    def test_timeout(self):
        """
        Test that uses the sleep_for function with an input of 5 seconds and asserts
        that a timeout is thrown as the function defined above has a timeout decorator
        which should timeout after 1 second.
        """
        try:
            self.sleep_for(5)
        except Exception as error_msg:
            error_string = str(error_msg)

        self.assertEqual(error_string, "STREAM ioctl timeout")

if __name__ == '__main__':
    unittest.main()
