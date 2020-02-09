from helper_class.email_class import Email
from lib.database import Database
from helper_class.flags import Flags
from helper_class.logger import Logger

FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

sender = "390soen@gmail.com"
subject = "Test Email"
password = "390minicapstone"

html = """\
<html>
  <head>
  <h1>Travelling Strategy is amazing</h1>
  </head>
  <body>
    <p>Hi! I am the traveling strategy bot<br>
       How are you?<br>
       Here is your favorite <a href="http://www.travelingstrategy.com">website</a> .
    </p>
  </body>
</html>
"""

LOGGER.info(f'Getting information from table subscribers.')
subscribers = DB.get_items("subscribers")
for user in subscribers:
      LOGGER.info(f'Sending email to {user}.')
      recipient = user[0]
      email = Email(subject, sender, recipient, html)
      email.sendEmail(password)