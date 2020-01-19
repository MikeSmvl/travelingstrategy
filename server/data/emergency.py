from helper_class.api_helper import ApiHelper
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.database import Database
from lib.config import currency_api_link, iso_list_2, sqlite_db
import pandas as pd

# Initialize flags and logger
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

# Initialize DB
DB = Database(sqlite_db)

# Removing table if it was already there
DB.drop_table("emergency")

# Create table if it does not exist
DB.add_table('emergency', country='text', police='text', ambulance='text', fire='text')


data_tables = pd.read_html('http://chartsbin.com/view/1983')
data_table = data_tables[0]
latest_year = data_table.columns[1]

for country in iso_list_2:
  try:
    if str(data_table.iloc[iso_list_2.index(country)][1]) == 'nan':
      police = ''
    else:
      police = data_table.iloc[iso_list_2.index(country)][1]
    if str(data_table.iloc[iso_list_2.index(country)][2]) == 'nan':
      ambulance = ''
    else:
      ambulance = data_table.iloc[iso_list_2.index(country)][2]
    if str(data_table.iloc[iso_list_2.index(country)][3]) == 'nan':
      fire = ''
    else:
      fire = data_table.iloc[iso_list_2.index(country)][3]
    #print(f"{country} {police} {ambulance} {fire}")
    DB.insert_or_update('emergency', country, police, ambulance, fire)
  except Exception as error_msg:
    print(error_msg)
    pass