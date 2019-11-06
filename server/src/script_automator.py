import sqlite3
import schedule
import time
import subprocess
import sys

print("Output from Python")
while True:
    schedule.run_pending()
    time.sleep(1)