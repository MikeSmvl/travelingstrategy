import unittest
import os
import sys

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from selfie_detection import check_if_group_photo

class group_photo_test(unittest.TestCase):

    def test_baseline_group_photos(self):
        """
        Test that the check_if_group_photo function can identify group photos
        """
        check_group_photo_1 = check_if_group_photo('assets/group_photo1.jpg')
        check_group_photo_2 = check_if_group_photo('assets/group_photo2.jpeg')
        check_group_photo_3 = check_if_group_photo('assets/group_photo3.jpg')
        check_not_group_photo_1 = check_if_group_photo('assets/not-selfie1.jpg')
        check_not_group_photo_2 = check_if_group_photo('assets/not-selfie2.jpg')
        check_not_group_photo_3 = check_if_group_photo('assets/not-selfie3.jpg')

        self.assertTrue(check_group_photo_1)
        self.assertTrue(check_group_photo_2)
        self.assertTrue(check_group_photo_3)
        self.assertFalse(check_not_group_photo_1)
        self.assertFalse(check_not_group_photo_2)
        self.assertFalse(check_not_group_photo_3)

if __name__ == '__main__':
    unittest.main()