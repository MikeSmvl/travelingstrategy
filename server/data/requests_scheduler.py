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
#LINE
user = "lineghanem"
command = "/Library/Frameworks/Python.framework/Versions/3.7/bin/python3 ~/Documents/Capstone"

#CHARLES
# user = "charleschan"
# command = "/usr/local/bin/python3 /Users/charleschan"

my_cron = CronTab(user=user)

job1 = my_cron.new(command=command+"/travelingstrategy/server/data/requests_handler.py")
job1.minute.every(1)
job2 = my_cron.new(command=command+"/travelingstrategy/server/data/another_handler.py")
job2.minute.every(1)
my_cron.write()

for jobs in my_cron:
    print(jobs.is_valid())

