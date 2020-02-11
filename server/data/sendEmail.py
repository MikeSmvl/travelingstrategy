from helper_class.email_class import Email
from lib.database import Database
from lib.config import sender, subject,password
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.email_html import email_html

FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

html = email_html

LOGGER.info(f'Getting information from table subscribers.')
subscribers = DB.get_items("subscribers")
for user in subscribers:
  LOGGER.info(f'Sending email to {user}.')
  recipient = user[0]
  email = Email(subject, sender, recipient, html)
  email.sendEmail(password)