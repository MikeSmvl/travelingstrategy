from helper_class.flags import Flags
from helper_class.logger import Logger

from crontab import CronTab
import datetime

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
# DB = Database("countries.sqlite")


# Cron job scheduler
# here to run the scripts daily

	
my_cron = CronTab(user='charleschan')

print(1)
job = my_cron.new(command='/usr/local/Cellar/python/3.7.5/Frameworks/Python.framework/Versions/3.7/Python /Users/charleschan/travelingstrategy/server/data/requests_handler.py')

for jobs in my_cron:
    print (jobs)

print(2)

job.minute.every(1)
my_cron.write()

print(3)

print(4)