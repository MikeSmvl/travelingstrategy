from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from instagram_img import find_a_post,create_table
from send_email import send_an_email

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


def to_trip():
    try:
        data = DB.select_items_with_cur("requests")
        for d in data:
            date_of_trip = d['date_of_trip']
            request_id = d['request_id']
            days_to_trip = calculate_days_to_trip(date_of_trip)
            if days_to_trip == -1:
                days_to_trip = 0

            DB.update("requests", f'request_id = {request_id}', f"days_to_trip = {days_to_trip}")

    except:
        LOGGER.error(f'Failed to decrement the dates to trip on:{DATE}')

def new_request():
    try:
        new = DB.select_items_with_cur("requests", 'days_to_trip = -1')
        if not new == None:
            for n in new:
                date_of_trip = n['date_of_trip']
                request_id = n['request_id']
                search_term = n['search_term']
                days_to_trip = calculate_days_to_trip(date_of_trip)
                DB.update("requests", f'request_id = {request_id}', f"days_to_trip = {days_to_trip}")
                find_a_post(search_term,request_id,7)
    except:
        LOGGER.error(f"Error occured in the new_request function")

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

            LOGGER.info(f'{email}, {request_id}, {days_to_trip}, {search_term}')

            try:
                nb_image = DB.select_items_with_cur("images", f"request_id = {request_id}")
                if nb_image == None:
                    nb_image = 0
                else:
                    nb_image = len(nb_image)

            except:
                LOGGER.error(f"Could not find the number of images for reuqest: {request_id}")

            if (days_to_trip <= 14) and (days_to_trip > 7):
                try:
                    DB.query(f'delete from images where request_id={request_id}')
                    find_a_post(search_term,request_id,7)
                except:
                    LOGGER.error(f'Could not retreive the image for day {days_to_trip} and request {request_id}')

            # if (days_to_trip < 13) and (days_to_trip >= 7):
                # send_an_email(request_id,email)

            if days_to_trip == -14:
                DB.remove('requests', f'request_id = {request_id}')

        LOGGER.success(f'Get the info from the requests table on: {DATE}')
    except:
        LOGGER.error(f'Could not retreive the info')

def set_up_db():
    DB.add_table("requests",request_id="INTEGER PRIMARY KEY AUTOINCREMENT", user_id = "INTEGER",days_to_trip="INTEGER",
            date_of_trip="text", search_term="text", email="text",latitude="text",longitude="text")

take_photo()