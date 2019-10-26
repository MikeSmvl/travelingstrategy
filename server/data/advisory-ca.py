import urllib.request, json;
import contextlib
from html.parser import HTMLParser;

#Html parser
class MyHTMLParser(HTMLParser): #Initializing lists
    lsData = list()
   #HTML Parser Methods
    def handle_data(self,data):
        self.lsData.append(data)

def find_visa(parser):
    visas = False
    visa_info = ""
    count = 0
    for i in parser.lsData:
        if (i == 'Visas'):
            visas = True
            count = count+1
        elif (visas == True & count <=3):
            visa_info = visa_info + ' ' + i
            count = count+1
        elif (count == 4):
            visas = False
            return visa_info
    lsData = list()
    return 'visa_info'

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
        country_eng = country_data['eng']
        name = country_eng['name']
        advisory_text = country_eng['advisory-text']
        entry_exit_html = country_eng.get('entry-exit')
        parser = MyHTMLParser()
        parser.feed(entry_exit_html)
        visa_info = find_visa(parser)
        info = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}
        countries_data[name]=info

with open('advisory-ca.json', 'w') as fp:
    json.dump(countries_data, fp)






#for mac : Install Certificates.command run
