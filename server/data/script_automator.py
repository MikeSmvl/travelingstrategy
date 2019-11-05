import sqlite3
import schedule
import time
import subprocess
import advisory_ca


schedule.every().day.do(advisory_ca)

while True:
    schedule.run_pending()
    time.sleep(1)