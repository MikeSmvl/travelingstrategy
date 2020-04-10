import time
import schedule
from requests_handler import to_trip, take_photo, new_request

def daily():
    to_trip()
    take_photo()

def minute():
    new_request()

schedule.every(1).days.do(daily)
schedule.every(1).minutes.do(minute)

while True:
    schedule.run_pending()
    time.sleep(1)
