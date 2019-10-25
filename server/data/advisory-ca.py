import urllib.request, json;


with urllib.request.urlopen("https://data.international.gc.ca/travel-voyage/index-alpha-eng.json") as url:
    all_countries = json.loads(url.read().decode())

all_countries = all_countries['data']

all_countries = all_countries.keys()

for key in all_countries:
    country_url = "https://data.international.gc.ca/travel-voyage/cta-cap-",key,".json",sep='')
    with urllib.request.urlopen(country_url)
        country_data = json.loads(country_url.read().decode())
        #with open('advisory-ca.json') as f:






#for mac : Install Certificates.command run
