import sys
import sqlite3
import schedule
import time
sys.path.append('../data')
from advisory_ca import save_to_canada
from advisory_aus import save_to_australia
from advisory_nz import save_to_newZealand

schedule.every().day.do(save_to_canada)
schedule.every().day.do(save_to_australia)
schedule.every().day.do(save_to_newZealand)

while True:
    schedule.run_pending()
    time.sleep(1)