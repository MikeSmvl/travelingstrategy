import datetime
import sys
import sqlite3

sys.path.append("..")
from lib.database import Database

DB = Database("../countries.sqlite")
#This maybe will no be done in this script but we keep for testing
NOW = datetime.datetime.now()
DATE_FORMAT = "%Y-%m-%d"
DATE = NOW.strftime(DATE_FORMAT)

conn = sqlite3.connect('../countries.sqlite')

def set_up_db():
    c = conn.cursor()
    c.execute('''DROP TABLE IF EXISTS requests''')
    conn.commit()
    c.execute('''CREATE TABLE requests
             (request_id INTEGER PRIMARY KEY, user_id INTEGER, days_to_trip INTEGER, date_of_trip VARCHAR, search_term VARCHAR, email VARCHAR, latitude VARCHAR, longitude VARCHAR, UNIQUE(search_term, email))''')
    conn.commit()
    # Insert a row of data
    c.execute("INSERT INTO 'requests' VALUES (1, -1, 8,'2020-3-23','Mardid', 'ghanemline@gmail.com', 'lat', 'long')")
    conn.commit()
    c.execute("INSERT INTO 'requests' VALUES (2, -1, 15,'2020-3-30','New York', 'test@test.com', 'lat', 'long')")
    # Save (commit) the changes
    conn.commit()

    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    conn.close()


def calculate_days_to_trip(date_trip):
    date_trip = datetime.datetime.strptime(date_trip, DATE_FORMAT)
    delta = date_trip - NOW
    days = delta.days
    return days


#TO DELETE
def test():
    DB.insert("requests", "1", "-1", str(to_trip), "2020-03-23", "Madrid", "ghanemline@gmail.com")
    DB.insert("requests", "2", str(to_trip), "2020-03-30", "New York", "test@test.com")

# Since we are testing we are reusing the same ids
#TO BE DELETED
#DB.drop_table("requests")
set_up_db()
#test()