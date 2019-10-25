import urllib.request, json;
import contextlib

with urllib.request.urlopen("https://data.international.gc.ca/travel-voyage/index-alpha-eng.json") as url:
    all_countries = json.loads(url.read().decode())

all_countries = all_countries['data']

all_countries = all_countries.keys()

countries_data = {}

for key in all_countries:
    country_url = "https://data.international.gc.ca/travel-voyage/cta-cap-{}.json".format(key,sep='')

    with contextlib.closing(urllib.request.urlopen(country_url)) as url:
        country_data = json.loads(url.read().decode())
        country_data = country_data['data']
        country_iso = key
        country_data = country_data['eng']
        name = country_data['name']
        advisory_text = country_data['advisory-text']
        info = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text}
        countries_data[name]=info

with open('advisory-ca.json', 'w') as fp:
    json.dump(countries_data, fp)






#for mac : Install Certificates.command run
