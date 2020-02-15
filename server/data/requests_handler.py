from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database

import datetime

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

# Cron job , to handle logic
# decrement # of days to trip
# at 14 days, we start taking photo
# at 7 days we send out the reminder

def daily_decrement():
    # UPDATE requests SET days_to_trip = days_to_trip -1;
    try:
        DB.update("requests", 'user_id>0',"days_to_trip = days_to_trip - 1")
    except:
        LOGGER.error(f'could not uodate the number of days')

with open('/Users/lineghanem/Documents/Capstone/travelingstrategy/server/data/dateInfo.txt','a') as outFile:
    outFile.write('\n' + str(datetime.datetime.now()))

daily_decrement()