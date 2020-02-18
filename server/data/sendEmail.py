from email_classes.email_class import Email
from lib.database import Database
from lib.config import sender, subject,password
from helper_class.flags import Flags
from helper_class.logger import Logger
from email_classes.email_html import Email_html

FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")



def getImages(city):
  try:
    stringCity = "'"+city+"'"
    LOGGER.info(f'Retrieving pictures for: {stringCity}')
    query = "SELECT image_link FROM images WHERE tag="+stringCity
    x = DB.query(query)
    email_html = Email_html()
    count = 0

    for image in x:
      if(count <= 5):
        x = ' '.join(image)
        if(count == 0):
          email_html.add_left_image(x,"246", "246", "Sri Lanka")
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 1):
          email_html.add_right_image(x, "246", "139", "Peru")
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 2):
          email_html.add_left_image(x,"246", "185", "Sri Lanka")
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 3):
          email_html.add_right_image(x, "246", "246", "Peru")
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 4):
          email_html.add_left_image(x,"246", "139", "Sri Lanka")
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        else:
          email_html.add_right_image(x, "246", "185", "Peru")
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        count  = count +1
    return  email_html.get_email()
 
  except Exception as error_msg:
      LOGGER.error(f'The following error has occured while retrieving the image for {stringCity}: {error_msg}')



LOGGER.info(f'Getting information from table subscribers.')
subscribers = DB.get_items("subscribers")
for user in subscribers:
  try:
    LOGGER.info(f'Sending email to {user}.')
    recipient = user[0]
    html =getImages(user[1].replace(" ", "").lower()) 
    email = Email(subject, sender, recipient, html)
    email.sendEmail(password)
  except Exception as error_msg:
    LOGGER.error(f'Email could not be sent to {user} for the following reason: {error_msg}')