import unittest
from unittest.mock import MagicMock, patch
import logging
import yagmail


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

  #make sure that email is  sent out and it is sent with our email address
  def test_send_email(self):
    yagmail.SMTP = MagicMock(return_value='travelingstrategy@gmail.com')
    sendEmail = SendEmail()
    yagmail.SMTP.assert_called_with('test_email_name')
    self.assertEqual(sendEmail.email_string, 'travelingstrategy@gmail.com')

class SendEmail():
    def __init__(self, email_string='test_email_name'):
      self.email_string = yagmail.SMTP(email_string)

class SafeScheduler():
  def __init__(self, level_string='test_level_name'):
    self.level = logging.getLevelName(level_string)

if __name__ == '__main__':
  unittest.main()