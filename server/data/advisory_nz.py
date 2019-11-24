import sqlite3
import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from helper_class.country_names import find_all_iso
from helper_class.sqlite_advisories import sqlite_advisories





def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://safetravel.govt.nz/travel-advisories-destination'

        #set up the headless chrome driver
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        # create a new chrome session
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(19)
        driver.get(url)

        #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'lxml')

        #patter of the link to the country page that the href should match
        reg = regex.compile(r'\w+-*')
        table = soup.find('table')
        table_body = table.find('tbody')
        table_rows = table_body.find_all('tr')

        for tr in table_rows:
            cols = tr.find_all('td')
            cols = [ele.text.strip() for ele in cols]

            name = cols[1]
            a = tr.find('a', attrs = {'href':reg})
            info[name] = {"href":a['href']}
           

    finally:
        driver.close()
        driver.quit()

    return info




#the two functions below should be puth in chrome driver class
def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(19)
    return driver

def quit_driver(driver):
    driver.quit()





def save_to_new_zealend():

    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()
    visas = parse_a_country_visa("https://en.wikipedia.org/wiki/Visa_requirements_for_New_Zealand_citizens",driver)

    print("hello")
    for country in url:
        driver.implicitly_wait(5)
        name = country
        print(name,"okey")
        href = url[country].get("href")
        
        link = "https://safetravel.govt.nz/{}".format(href,sep='')
        advisory_text = parse_a_country_advisory(link,driver)

        visa_text= ""
        for countryVisa in visas:
            if(countryVisa ==  country):
               visa_text = visas[countryVisa].get('visa')
               break;




        country_iso = "na"
        data[name] = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_text}
        data = find_all_iso(data)

        with open('./advisory-aus.json', 'w') as outfile:
             json.dump(data, outfile)

    save_into_db(data)





def parse_a_country_advisory(url,driver):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    warning = " "
    for tag in soup.findAll('i'):
      if tag.parent.name == 'h1':
          warning = tag.parent.text.strip()

    return warning

    

def parse_a_country_visa(url,driver):
    info ={}
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    visa = " "
    table = soup.find('table')
    table_body = table.find('tbody')
    table_rows = table_body.find_all('tr')
    x = 0
    for tr in table_rows:
         x = x+1
         cols = tr.find_all('td')
         cols = [ele.text.strip() for ele in cols]
         name = cols[0]
         if(x < 5):
           visaLength = len(cols[1])-3
           visa = cols[1][0:visaLength]
         elif( x < 80):
           visaLength = len(cols[1])-4
           visa = cols[1][0:visaLength]
         else: 
           visaLength = len(cols[1])-5  
           visa = cols[1][0:visaLength]
         if(visa[len(visa)-1: len(visa)] == ']'):
              if(x < 5):
                visaLength = len(visa)-3
                visa = visa[0:visaLength]
              elif( x < 80):
                visaLength = len(visa)-4
                visa = visa[0:visaLength]
              else: 
                visaLength = len(visa)-5  
                visa = visa[0:visaLength]
         if(name == "Angola"):
           visaLength = len(visa)-2
           visa = visa[0:visaLength]
            
            
         info[name] = {"visa":visa}

    return info




def save_into_db(data):
    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('newzealand')
    sqlite.delete_table()
    sqlite.create_table()
    for country in data:
        iso = data[country].get('country-iso')
        name = data[country].get('name')
        text = data[country].get('advisory-text')
        visa_info = data[country].get('visa-info')
        sqlite.new_row(iso,name,text,visa_info)
    sqlite.commit()
    sqlite.close()

driver = create_driver()
save_to_new_zealend()