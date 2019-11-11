import urllib.request, json
import contextlib
from html.parser import HTMLParser
import sqlite3
import logging


#Html parser
class MyHTMLParser (HTMLParser): #Initializing lists
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

    def handle_data(self, data):
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

def advisory_canada(all_countries,logger):
    countries_data = {}
    for key in all_countries:
        country_url = "https://data.international.gc.ca/travel-voyage/cta-cap-{}.json".format(key,sep='')
        logger.info("Updating{}".format(key))
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

def save_to_canada():

    #logging to a file
    logger =  logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s')

    file_handler = logging.FileHandler('advisory_ca.log')
    file_handler.setFormatter(formatter)

    logger.addHandler(file_handler)

    con  = sqlite3.connect('../../countries.sqlite')
    cur = con.cursor()
    #should not create the table every time
    #change in the future
    cur.execute('DROP TABLE IF EXISTS canada')
    con.commit()
    cur.execute('CREATE TABLE canada (country_iso VARCHAR, name VARCHAR, advisory_text VARCHAR, visa_info VARCHAR)')
    con.commit()

    all_countries = get_all_countries()
    countries_data = advisory_canada(all_countries,logger)

    logger.info("Running the advisory-ca script, updating the data from the canadian gov.")
    for country in countries_data:
        iso = countries_data[country].get('country-iso')
        n = countries_data[country].get('name')
        text = countries_data[country].get('advisory-text')
        info = countries_data[country].get('visa-info')
        cur.execute('INSERT INTO canada (country_iso,name,advisory_text,visa_info) values(?,?,?,?)',(iso,n,text,info))
    con.commit()

    with open('advisory-ca.json', 'w') as fp:
        json.dump(countries_data, fp)

    con.close()
