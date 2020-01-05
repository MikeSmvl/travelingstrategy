import urllib.request, json
import contextlib
from html.parser import HTMLParser
import sqlite3
from bs4 import BeautifulSoup
import regex
import time

from helper_class.country_names import find_iso_of_country, find_all_iso
from helper_class.chrome_driver import create_driver, quit_driver
from bs4 import BeautifulSoup

#in the file provided h3 is a sign that a new data type starts
#if the header list is empty then the data is still part of the
#previous h3
def p_with_h3(text):
    header = text.find_all(regex.compile('h3'))
    if (len(header)>0):
        return True
    return False

#Uses beaustiful soup to get the information of a particular subject
#for example data_type = "Visas"
#The data type is contained in a h3 header
def MyBeautifulSoup(entry_exit_html, data_type):
    data_text = ''
    soup = BeautifulSoup(entry_exit_html,'lxml')

    header = soup.find_all(regex.compile(r'(h[1-5]|p)'))
    data_found = False

    for ele in header:

        if (ele.text.strip() == data_type):
            #if we are in the appropriate header
            #else we continue until we find it
            data_found = True

        elif(ele.name == 'h3'):
            #if we reach a new h3 header we set the bool to false
            #we got all the data that was under the previous h3
            data_found = False

        elif (p_with_h3(ele)):
            #sometimes h3 is inside another p element
            data_found = False

        elif (data_found):
            br = ele.find_all('br')
            for e in br:
                #if replacing </br> by <br> does not work with sqlite
                #we can do " " and take care of it in the front end
                e.replace_with("<br>")
            data_text += "<br>"+ele.text.strip()

    return data_text


#get the name and abreviation of all countries
#the canadian gotv has data on
def get_all_countries():
    all_countries = {}
    with urllib.request.urlopen("https://data.international.gc.ca/travel-voyage/index-alpha-eng.json") as url:
        all_countries = json.loads(url.read().decode())
        all_countries = all_countries['data']
        all_countries = all_countries.keys()
    return all_countries

#gets the url for each country 
#calls parse_additional_advisory_info and passes url
def get_additional_advisory_info_url():
  try:
    url = 'https://travel.gc.ca/travelling/advisories'
    #set up the headless chrome driver
    driver = create_driver()
    driver.get(url)
    soup=BeautifulSoup(driver.page_source, 'lxml')

    table = soup.find('table')
    table_body = table.find('tbody')
    table_rows = table_body.find_all('tr')
    additional_advisory = {}
    for tr in table_rows:
       cols = tr.find_all('td')
       href = cols[1].find('a').get('href')
       link = "https://travel.gc.ca{}".format(href,sep='')
       country = link[34:len(link)]
       country = country.replace('-', ' ')
       iso = find_iso_of_country(country)
       print(iso)
       additional_advisory[iso] = parse_additional_advisory_info(link, driver) 
  finally:
      quit_driver(driver)
      return additional_advisory
       

def parse_additional_advisory_info(url, driver):
       time.sleep(1)
       driver.get(url)
       #Selenium hands the page source to Beautiful Soup
       soup=BeautifulSoup(driver.page_source, 'lxml')
       warning = " "
       advisory_list = soup.find("div", {"class": "tabpanels"})
       security_list = advisory_list.find("details", {"id": "security"})
       advisories = security_list.find("div", {"class": "tgl-panel"})
    
       count = 0
       tag_type =""
       for tag in advisories:
          if(tag.name == 'h3'):
            if(tag.text.strip().lower() == "crime"):
              count  = 1
              tag_type = 'Crime'
            elif(tag.text.strip().lower() == "kidnapping"):
              count  = 1
              tag_type = 'Kidnapping'
            elif(tag.text.strip().lower() == "landmines"):
              count  = 1
              tag_type = 'Landmines'
            elif(tag.text.strip().lower() == "terrorism"):
              count  = 1
              tag_type = 'Terrorism'
          elif(count == 1):
            warning += '</br>'+ tag_type +" "+ tag.text.strip()
            count = 0
       return warning



#opens the url to the files of all countries
#get the requiered data and stores it in a dictionary
def advisory_canada(all_countries):
    countries_data = {}
    additional_advisory_info = get_additional_advisory_info_url()
    for key in all_countries:
        country_url = "https://data.international.gc.ca/travel-voyage/cta-cap-{}.json".format(key,sep='')

        with contextlib.closing(urllib.request.urlopen(country_url)) as url:
            country_data = json.loads(url.read().decode())
            country_data = country_data['data']
            country_iso = key
            country_eng = country_data['eng']
            name = country_eng['name']
            print (name, "   ", country_iso)
            if(country_iso in additional_advisory_info):
              additional_advisory_info[country_iso]
              advisory_text = country_eng['advisory-text']+ " " + additional_advisory_info[country_iso]
            else:
             advisory_text = country_eng['advisory-text']
            entry_exit_html = country_eng.get('entry-exit')
            visa_info = MyBeautifulSoup(entry_exit_html,"Visas")
            #print(visa_info)
            info = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}
            countries_data[name]=info
    return countries_data

#save the data from the returned dicionary in a json file
#and in the sqlite db
def save_to_canada():

    #chanhge root
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()

    #should not create the table every time
    #change in the future
    cur.execute('DROP TABLE IF EXISTS CA')
    con.commit()
    cur.execute('CREATE TABLE CA (country_iso VARCHAR, name VARCHAR, advisory_text VARCHAR(10000), visa_info VARCHAR)')
    con.commit()

    #getting the data from all countries
    all_countries = get_all_countries()
    countries_data = advisory_canada(all_countries)

    #saving the data in db
    for country in countries_data:
        iso = countries_data[country].get('country-iso')
        n = countries_data[country].get('name')
        text = countries_data[country].get('advisory-text')
        info = countries_data[country].get('visa-info')

        cur.execute('INSERT INTO CA (country_iso,name,advisory_text,visa_info) values(?,?,?,?)',(iso,n,text,info))

    con.commit()
    con.close()

    #saving the data in json file
    with open('advisory-ca.json', 'w') as fp:
        json.dump(countries_data, fp)

save_to_canada()