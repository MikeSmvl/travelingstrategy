import unittest
import os
import sys

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from youtube_helper import youtube_link
from country_video_links import country_dict

class TestYoutubeHelper(unittest.TestCase):
    def is_part(self, string, substring):
        # Return true if substring is in a string
        return substring in string

    def test_link(self):
        # Test that uses the youtube_helper class and asserts that all countries return a youtube video link.
        try:
            # Since there is a large amount of countries, run test for first n countries
            n = 5
            for _, v in country_dict:
                if n == 0:
                    break
                self.assertTrue(self.is_part(youtube_link(v), 'youtube'))
                n -= 1
        except Exception as error_msg:
            self.fail(f'The following exception occured: {error_msg}')

if __name__ == '__main__':
    unittest.main()
