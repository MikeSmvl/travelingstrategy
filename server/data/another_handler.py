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


with open('/Users/lineghanem/Documents/Capstone/travelingstrategy/server/data/dateInfo2.txt','a') as outFile:
    outFile.write('\n' + str(datetime.datetime.now()))

