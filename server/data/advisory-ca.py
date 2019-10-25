import urllib.request, json;
import contextlib

with urllib.request.urlopen("https://data.international.gc.ca/travel-voyage/index-alpha-eng.json") as url:
    all_countries = json.loads(url.read().decode())

all_countries = all_countries['data']

all_countries = all_countries.keys()

for key in all_countries:
    country_url = "https://data.international.gc.ca/travel-voyage/cta-cap-{}.json".format(key,sep='')

    with contextlib.closing(urllib.request.urlopen(country_url)) as url:
         country_data = json.loads(url.read().decode())
         country_data = country_data['data']
         print(country_data['country-iso'])







#for mac : Install Certificates.command run
