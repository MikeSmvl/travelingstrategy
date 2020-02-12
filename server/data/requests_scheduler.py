from helper_class.flags import Flags
from helper_class.logger import Logger

from crontab import CronTab
import datetime

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")


# Cron job scheduler



