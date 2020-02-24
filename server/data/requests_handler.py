from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from instagram_img import find_a_post,create_table
from sendEmail import send_email

import datetime

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

#current date
NOW = datetime.datetime.now()
DATE_FORMAT = "%Y-%m-%d"
DATE = NOW.strftime(DATE_FORMAT)

# decrement # of days to trip
# Cron job , to handle logic
# at 14 days, we start taking photo
# at 7 days we send out the reminder

def calculate_days_to_trip(date_trip):
    date_trip = datetime.datetime.strptime(date_trip, DATE_FORMAT)
    delta = date_trip - NOW
    days = delta.days
    return days

def calculate_days_to_trip_test(date_trip):
    date_trip = datetime.datetime.strptime(date_trip, DATE_FORMAT)
    test_date = datetime.datetime.strptime("2020-2-25", DATE_FORMAT)
    delta = date_trip - test_date
    days = delta.days
    return days

def to_trip():
    try:
        data = DB.select_items_with_cur("requests","days_to_trip=-1")
        print(data)
        for d in data:
            date_of_trip = d['date_of_trip']
            request_id = d['request_id']
            print(request_id)
            days_to_trip = calculate_days_to_trip(date_of_trip)
            if days_to_trip == -1:
                days_to_trip = 0
            DB.update("requests", f'request_id = {request_id}', f"days_to_trip = {days_to_trip}")

    except:
        print('ERRRRRROR')


# decrement # of days to trip
def daily_decrement():
    # UPDATE requests SET days_to_trip = days_to_trip -1;
    try:
        #no where clause all the records are updated :)
        DB.update("requests", 'days_to_trip > 0', "days_to_trip = days_to_trip - 1")
        LOGGER.success(f'Decrement the date to trip of all users in table requests on: {DATE}')
    except:
        LOGGER.error(f'Could not decrement the numbers of day to trip in table requests on: {DATE}')

# at 14 days, we start taking photo
def take_photo():
    try:
        #no where clause all the records are updated :)
        data = DB.select_items_with_cur("requests")
        for d in data:
            request_id = d['request_id']
            days_to_trip = d['days_to_trip']
            search_term = d['search_term']
            user_id = d['user_id']
            email = d['email']
            print(days_to_trip)

            if (days_to_trip <= 14) and (days_to_trip > 7):
                try:
                    find_a_post(search_term,request_id)
                except:
                    LOGGER.error(f'Could not retreive the image for day {days_to_trip} and request {request_id}')
            if days_to_trip == 7:
                send_email(request_id,email)

        LOGGER.success(f'Get the info from the requests table on: {DATE}')
    except:
        LOGGER.error(f'Could not retreive the info')


DB.drop_table("images")
create_table("images")
take_photo()
#daily_decrement()
# to_trip()