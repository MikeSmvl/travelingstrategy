import sys
import sqlite3
import schedule
import time
from schedule_error_handling import SafeScheduler

sys.path.append('../data')
from advisory_ca import save_to_canada
from advisory_aus import save_to_australia
from advisory_nz import save_to_newZealand

def main():
    scheduler = SafeScheduler()
    scheduler.every().seconds.do(save_to_canada)
    scheduler.every().seconds.do(save_to_australia)
    scheduler.every().seconds.do(save_to_newZealand)

    while True:
        scheduler.run_pending()
        time.sleep(1)
        