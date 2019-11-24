import sys
import sqlite3
import schedule
import time
import traceback
import logging
from schedule_error_handling import SafeScheduler

sys.path.append('../data')
from advisory_ca import save_to_canada
from advisory_aus import save_to_australia
from advisory_nz import save_to_newZealand
from error_email import send_email

#logging to a file 
#logging level ERROR.This means its a serious problem as the software was not able to perform some functions 
logger =  logging.getLogger(__name__)
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s:%(levelname)s:[%(filename)s: %(lineno)s - %(funcName)20s()]:%(name)s:%(message)s')

file_handler = logging.FileHandler('scheduler.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

#in this file, we make sure that the data file are ran once daily.
#we also handle any type of errors here
def start_scheduler():
  try:  
    logger.info("Automation has started...")
    scheduler = SafeScheduler()
    scheduler.every().day.do(save_to_canada)
    scheduler.every().day.do(save_to_australia)
    scheduler.every().day.do(save_to_newZealand)
 
    while True:
      scheduler.run_pending()
      time.sleep(1)
  
  except: 
    scheduler.keep_running = False
    e = traceback.format_exc()
    send_email(e)
    logger.error("Automation has stopped running due to the following reason: \n %s", e)

if __name__ == "__main__":
    start_scheduler()