import json
import datetime
import pytz
import math
from bs4 import BeautifulSoup
from helper_class.chrome_driver import create_driver, quit_driver
import urllib.request, json,urllib.parse
import contextlib
import traceback
from lib.database import Database
from helper_class.flags import Flags
from helper_class.logger import Logger

# Initialize flags, logger & database
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

def adding_lat_and_lng(cities):
    not_found = []
    cities_data = []
    for city in cities:
        city_name = city["city"].replace(" ", "")
        try:
            city_name = urllib.parse.quote_plus(city_name)
            city_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=AIzaSyAxFRTW8Wb6bcJw90yaT2MjeHaOEe9k5iM".format(city_name,sep='')
            LOGGER.info(f"Retrieving URL for {city_name}")
            with contextlib.closing(urllib.request.urlopen(city_url)) as url:
                city_data = json.loads(url.read().decode())
                city_data = city_data['results']
                lat_and_lng = city_data[0]["geometry"]["location"]
                lat = round(lat_and_lng["lat"]*10000000)/10000000 #7 digits after decimal
                lng = round(lat_and_lng["lng"]*10000000)/10000000
                city_object = {
                    "city" : city["city"],
                    "country_name": city["country_name"],
                    "country_iso": city["country_iso"],
                    "lat": lat,
                    "lng": lng,
                    "timezone": city["timezone"],
                    "utc_offset": city["utc_offset"]
                }
                cities_data.append(city_object)
                LOGGER.info(f'Timezone for {country_name}')
        except:
            print("Unexpected error:", traceback.format_exc())
            print("This city doesn't work",city_name)
            city_url = "https://maps.googleapis.com/maps/api/geocode/json?address={}&key=AIzaSyAxFRTW8Wb6bcJw90yaT2MjeHaOEe9k5iM".format(city_name,sep='')
            print("city url", city_url)
            not_found.append(city_name)
    print("These are not found",not_found)
    return cities_data

def get_cities_info():
    info = {}
    cities = []
    with open('cityMap.json') as json_file:
        data = json.load(json_file)
        for city_info in data:
            city = city_info["city"]
            country_name = city_info["country"]
            country_iso = city_info["iso2"]
            timezone = city_info["timezone"]

            utc_offset = None
            if(timezone != None):
                date = datetime.datetime.now(pytz.timezone(timezone))
                utc_offset = date.utcoffset().total_seconds()/60/60

            info = {
                "city" : city,
                "country_name": country_name,
                "country_iso": country_iso,
                "timezone": timezone,
                "utc_offset": utc_offset
            }
            cities.append(info)
    return cities

def save_cities_timezones():
    LOGGER.info("Retreiving timezones information for all countries...")
    data = adding_lat_and_lng(get_cities_info())
    # geolocator = Nominatim(user_agent="travelingstrategy")
    #con  = sqlite3.connect('../countries.sqlite')
    #cur = con.cursor()
    # should not create the table every time
    # change in the future
    #cur.execute('DROP TABLE IF EXISTS timezones')
    #con.commit()
    #cur.execute('CREATE TABLE timezones (city VARCHAR, country_name VARCHAR, country_iso VARCHAR, timezone VARCHAR, lat REAL, lng REAL, utc_offset int)')
    #SScon.commit()

    db = Database("countries.sqlite")
    db.drop_table("timezones")
    db.add_table("timezones", city="VARCHAR", country_name="VARCHAR", country_iso="VARCHAR", timezone="VARCHAR", la="REAL", lng="REAL",utc_offset = "int")


    for city_info in data:
        city = city_info["city"]
        country_name = city_info["country_name"]
        country_iso = city_info["country_iso"]
        timezone = city_info["timezone"]
        lat = city_info["lat"]
        lng = city_info["lng"]
        utc_offset = city_info["utc_offset"]
        LOGGER.success(f"{country_name} was sucefuly save into the timezone table with the following information: {country_iso} and {timezone}")
        db.insert("timezones",city, country_name, country_iso, timezone, lat, lng, utc_offset)
        LOGGER.success{f'{country_name} successfully saved to the database.'}
    db.close_connection()


if __name__ == '__main__':
    save_cities_timezones()
    # adding_lat_and_lng(get_cities_info())