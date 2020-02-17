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



def getImages(city):
  stringCity = "'"+city+"'"
  query = "SELECT image_link FROM images WHERE tag="+stringCity
  x = DB.query(query)
  email_html = Email_html()
  count = 0

  for image in x:
    if(count <= 5):
      x = ' '.join(image)
      if(count == 0):
        email_html.add_left_image(x,"246", "246", "Sri Lanka")
      elif(count == 1):
        email_html.add_right_image(x, "246", "139", "Peru")
      elif(count == 2):
        email_html.add_left_image(x,"246", "185", "Sri Lanka")
      elif(count == 3):
        email_html.add_right_image(x, "246", "246", "Peru")
      elif(count == 4):
        email_html.add_left_image(x,"246", "139", "Sri Lanka")
      else:
        email_html.add_right_image(x, "246", "185", "Peru")
      count  = count +1
  return  email_html.get_email()



LOGGER.info(f'Getting information from table subscribers.')
subscribers = DB.get_items("subscribers")
for user in subscribers:
  LOGGER.info(f'Sending email to {user}.')
  recipient = user[0]
  html =getImages(user[1].replace(" ", "").lower()) 
  email = Email(subject, sender, recipient, html)
  email.sendEmail(password)