import yagmail
import datetime
import logging
from traceback import format_exc
import traceback
import logging


logger =  logging.getLogger(__name__)
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s')

file_handler = logging.FileHandler('scheduler.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

#this file alerts the developers whenever this script file stops running
# it also returns the error that has caused it
def send_email(e):
  logger.info("Sending out emails with error description")
  yag = yagmail.SMTP('travelingstrategy@gmail.com')

  recipients = { 
    'chanc09@gmail.com': 'charles', 
    'svenacious@gmail.com': 'steffan',
    'oumarba221296@hotmail.fr': 'oumar',
    'mikael.samvelian@gmail.com': 'mikael',
    'karimian.hassan@gmail.com': 'hassan',
    'tdelaportas@hotmail.com': 'tyler',
    'ghanemline@gmail.com': 'line',
    'armine.iradian@gmail.com': 'armine'
  }

  date_of_failure = str(datetime.datetime.now())
  error_message = e
  contents = [
      "Automation has stopped working at" + date_of_failure + "\n" +error_message
  ]
  yag.send(recipients, 'subject', contents)
