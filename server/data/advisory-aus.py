import requests
# import HTMLSession from requests_html
from requests_html import HTMLSession
import urllib.request
import time
import json
from bs4 import BeautifulSoup
import regex


url = 'https://smartraveller.gov.au/Countries/Africa/Pages/default.aspx'
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')
script = soup.findAll('script')

data = {}
pattern = regex.compile(r'\{(?:[^{}]|(?R))*\}')

c = 0
for line in script:
    found_json= pattern.findall(line.text)
    if (c == 21): #we just want the data at line 21
        for j in found_json:
            country_data = json.loads(j)
            country_name  =  country_data['Title']
            data[country_name] = country_data
        break;
    c = c + 1
links = list()
c=0
pattern = regex.compile(r'\d{1,2}\;\#')
for k in data:
    ref = data[k]
    file_ref = ref['FileRef']
    file_ref = pattern.sub("",file_ref)
    ref['Url'] = 'https://smartraveller.gov.au/'+file_ref
    links.append(ref['Url'])
    c = c + 1
nodata = list()
print(c)
# create an HTML Session object
session = HTMLSession()
for l in links:
    # Use the object above to connect to needed webpage
    print (l)
    r = requests.get(l)
    soup = BeautifulSoup(r.text, "lxml")
    option_tags = soup.find_all('a', attrs={'href': regex.compile(r'\/resources\/pages\/travel-advice-explained\.')})
    #option_tags = soup.find_all("link", title = regex.compile(r'Travel Advice Updates –'))
    c = 0
    for a in option_tags:
        if (c == 0):
            print(a.text)
        c +=1


    if c == 0:
        print("oups no data")
        nodata.append(l)

print('no data on: ', nodata)