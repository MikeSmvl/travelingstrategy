from helper_class.email_class import Email
from lib.database import Database
from lib.config import sender, subject,password
from helper_class.flags import Flags
from helper_class.logger import Logger
from helper_class.email_html import Email_html

FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")


email_html = Email_html()
email_html.add_image("https://content.fortune.com/wp-content/uploads/2019/09/Intrepid-Travel-sri-lanka_dambulla_sigiriya-lion-rock-fortress_group.jpg", "Paris")
email_html.add_image("https://content.fortune.com/wp-content/uploads/2019/09/Intrepid-Travel-sri-lanka_dambulla_sigiriya-lion-rock-fortress_group.jpg", "Sri Lanka")
html = email_html.get_email()



LOGGER.info(f'Getting information from table subscribers.')
subscribers = DB.get_items("subscribers")
for user in subscribers:
  LOGGER.info(f'Sending email to {user}.')
  recipient = user[0]
  email = Email(subject, sender, recipient, html)
  email.sendEmail(password)