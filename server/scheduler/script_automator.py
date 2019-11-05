import sqlite3
import schedule
import time
from server import data


# schedule to run the scripts in the data folder everyday
schedule.every().day.do(data.advisory_ca)
schedule.every().day.do(data.advisory_aus)
schedule.every().day.do(data.advisory_nz)

while True:
    schedule.run_pending()
    time.sleep(1)