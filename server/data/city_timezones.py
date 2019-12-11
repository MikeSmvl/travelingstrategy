import json
import datetime
import pytz
import sqlite3


def save_cities_timezones():
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()
    # should not create the table every time
    # change in the future
    cur.execute('DROP TABLE IF EXISTS timezones')
    con.commit()
    cur.execute('CREATE TABLE timezones (city VARCHAR, country_name VARCHAR, country_iso VARCHAR, timezone VARCHAR, lat REAL, lng REAL, utc_offset int)')
    con.commit()

    with open('cityMap.json') as json_file:
        data = json.load(json_file)
        for city_info in data:
            city = city_info["city"]
            country_name = city_info["country"]
            country_iso = city_info["iso2"]
            timezone = city_info["timezone"]
            lat = round(city_info["lat"]*1000)/ 1000 #to round to .0001
            lng = round(city_info["lng"]*1000)/ 1000 #to round to .0001
            utc_offset = None

            if(timezone != None):
                date = datetime.datetime.now(pytz.timezone(timezone))
                utc_offset = date.utcoffset().total_seconds()/60/60

            cur.execute('INSERT INTO timezones (city,country_name,country_iso,timezone,lat,lng,utc_offset) values( ?, ?, ?, ?, ?, ?, ?)',(city,country_name,country_iso,timezone,lat,lng,utc_offset))

        con.commit()
        con.close()

if __name__ == '__main__':
    save_cities_timezones()