from helper_class.flags import Flags
from helper_class.logger import Logger
from helper_class.db_requests import calculate_days_to_trip

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

# Cron job , to handle logic
# decrement # of days to trip
# at 14 days, we start taking photo
# at 7 days we send out the reminder
