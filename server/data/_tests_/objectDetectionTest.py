import unittest
import os
import sys

# Get relative path to the data folder
data_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(data_dir)
from object_detection import check_for_objects

class object_detection_test(unittest.TestCase):

    def test_baseline_objects(self):
        """
        Tests that the check_for_objects function can identify big objects
        """
        check_object_1 = check_for_objects('assets/object1.jpg')
        check_object_2 = check_for_objects('assets/object2.jpeg')
        check_object_3 = check_for_objects('assets/object3.jpg')
        check_not_object_1 = check_for_objects('assets/not-object1.jpg')
        check_not_object_2 = check_for_objects('assets/not-object2.jpg')
        check_not_object_3 = check_for_objects('assets/not-object3.jpg')

        self.assertTrue(check_object_1)
        self.assertTrue(check_object_2)
        self.assertTrue(check_object_3)
        self.assertFalse(check_not_object_1)
        self.assertFalse(check_not_object_2)
        self.assertFalse(check_not_object_3)


if __name__ == '__main__':
    unittest.main()
