import unittest
from unittest.mock import MagicMock, patch
import logging

class IntegrationTest(unittest.TestCase):
  # when automation does not crash, test to see if logging level of the try block matche with our mocked object
  def test_automation_success(self):
    logging.getLevelName = MagicMock(return_value="INFO")
    scheduler = SafeScheduler()
    logging.getLevelName.assert_called_with('test_level_name')
    self.assertEqual(scheduler.level, 'INFO')

  # when automation does not crash, test to see if logging level of the except block was called
  def test_automation_failure(self):
    logging.getLevelName = MagicMock(return_value="ERROR")
    scheduler = SafeScheduler()
    logging.getLevelName.assert_called_with('test_level_name')
    self.assertEqual(scheduler.level, 'ERROR')

class SafeScheduler():
  def __init__(self, level_string='test_level_name'):
    self.level = logging.getLevelName(level_string) 

if __name__ == '__main__':
  unittest.main()