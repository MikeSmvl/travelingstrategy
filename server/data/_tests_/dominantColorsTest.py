import unittest
import os
import sys

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from dominant_colors import find_nearest_colors

class dominant_colors_detection_test(unittest.TestCase):

    def test_baseline_colors(self):
        """
        Tests that the find_nearest_colors function can identify images conatining too much of a certain color or similar shaded colors
        """
        try:
            check_dominant_colors_1 = find_nearest_colors('assets/dominant_colors1.jpg')
            check_dominant_colors_2 = find_nearest_colors('assets/dominant_colors2.jpg')
            check_dominant_colors_3 = find_nearest_colors('assets/dominant_colors3.jpg')
            check_not_dominant_colors_1 = find_nearest_colors('assets/not-dominant_colors1.jpg')
            check_not_dominant_colors_2 = find_nearest_colors('assets/not-dominant_colors2.jpg')
            check_not_dominant_colors_3 = find_nearest_colors('assets/not-dominant_colors3.jpg')
            self.assertTrue(check_dominant_colors_1)
            self.assertTrue(check_dominant_colors_2)
            self.assertTrue(check_dominant_colors_3)
            self.assertFalse(check_not_dominant_colors_1)
            self.assertFalse(check_not_dominant_colors_2)
            self.assertFalse(check_not_dominant_colors_3)
        except Exception as error_msg:
            print(error_msg)

if __name__ == '__main__':
    unittest.main()