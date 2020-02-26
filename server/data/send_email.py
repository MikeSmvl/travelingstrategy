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



def getImages(request_id):
  try:

    LOGGER.info(f'Retrieving pictures for: {request_id}')
    query_image = "SELECT image_link FROM images WHERE request_id="+str(request_id)
    LOGGER.info(f'Retrieving pictures for: {request_id}')
    x = DB.query(query_image)
    email_html = Email_html()
    count = 0

    for image in x:
      if(count <= 5):
        x = ' '.join(image)
        query_geolocation = "SELECT geolocation, geo_link FROM images WHERE image_link="+"'"+x+"'"
        row = DB.query(query_geolocation).fetchone()
        y = row[0]
        geo_link = row[1]

        if(count == 0):
          email_html.add_left_image(x,"246", "246", geo_link,y)
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 1):
          email_html.add_right_image(x, "246", "139", geo_link,y)
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 2):
          email_html.add_left_image(x,"246", "185", geo_link,y)
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 3):
          email_html.add_right_image(x, "246", "246", geo_link,y)
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        elif(count == 4):
          email_html.add_left_image(x,"246", "139", geo_link,y)
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        else:
          email_html.add_right_image(x, "246", "185", geo_link,y)
          LOGGER.success(f'Picture was succesfully retrieve: {x}')
        count  = count +1
    return  email_html.get_email()

  except Exception as error_msg:
      LOGGER.error(f'The following error has occured while retrieving the image for {request_id}: {error_msg}')

def send_an_email(request_id, email):
  LOGGER.info(f'Sending email to {email}.')
  recipient = email
  html = getImages(request_id)
  email = Email(subject, sender, recipient, html)
  email.sendEmail(password)

send_an_email("1","ghanemline@gmail.com")