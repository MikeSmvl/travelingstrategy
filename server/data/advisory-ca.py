import urllib.request, json
import contextlib
from html.parser import HTMLParser

#Html parser
class MyHTMLParser(HTMLParser): #Initializing lists
    headers = {}
    headerName = ''
    inHeader = False

    #HTML Parser Methods
    def handle_starttag(self, startTag, attrs):
        if(startTag == 'h3') | (startTag == 'h4'):
            self.inHeader = True

    def handle_endtag(self, endTag):
        if(endTag == 'h3') | (endTag == 'h4'):
            self.inHeader = False

    def handle_data(self,data):
        if (self.inHeader == True):
            self.headerName = data
            self.headers[data]=''
            self.inHeader = False

        elif (self.inHeader == False) & (self.headerName != ''):
            if self.headers[self.headerName] == '':
                self.headers[self.headerName] = data
            else:
                self.headers[self.headerName] = self.headers[self.headerName]+" "+data

def find_visa(parser):
    return parser.headers['Visas']

def get_all_countries():
    all_countries = {}
    with urllib.request.urlopen("https://data.international.gc.ca/travel-voyage/index-alpha-eng.json") as url:
        all_countries = json.loads(url.read().decode())
        all_countries = all_countries['data']
        all_countries = all_countries.keys()
    return all_countries

def advisory_canada(all_countries):
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
    return countries_data

all_countries = get_all_countries()
countries_data = advisory_canada(all_countries)

with open('advisory-ca.json', 'w') as fp:
    json.dump(countries_data, fp)

# with open('advisory-ca.json') as fp:
#     d  = json.loads(fp.read())
# print(d['Zimbabwe'].get('visa-info'))
#for mac : Install Certificates.command run
