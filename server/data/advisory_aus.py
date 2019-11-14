import requests
import time
import json
from bs4 import BeautifulSoup
import regex
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


#Get the path of all the pages australia has advisory detail on
def get_url_of_countries():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://smartraveller.gov.au/countries/pages/list.aspx'

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
        reg = regex.compile(r'\/Countries\/\w+-*\w*\/\w*-*\w*\/*Pages\/\w+-*\w*\.aspx')
        table = soup.find('table')
        table_body = table.find('tbody')
        table_rows = table_body.find_all('tr')

        for tr in table_rows:
            cols = tr.find_all('td')
            cols = [ele.text.strip() for ele in cols]

            if (cols[1]==''):
                cols[1]='No advisory from the australian government'

            name = cols[0]
            advisory_text = cols[1]
            a = tr.find('a', attrs = {'href':reg})
            href = a['href']
            info[name] = {"href":href,"advisory-text":advisory_text}
    finally:
        driver.close()
        driver.quit()

    return info


#this function is to parse only one country
#after getting its url from
def parse_a_country(url,driver,data_type):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    findheaders = soup.find_all(regex.compile(r'(h3|p)'))
    data_found = False
    data_text = ""
    for ele in findheaders:

        if (ele.text.strip() == data_type):
            #if we are in the appropriate header
            #else we continue until we find it
            data_found = True

        elif(ele.name == 'h3'):
            #if we reach a new h3 header we set the bool to false
            #we got all the data that was under the previous h3
            data_found = False

        elif (data_found):
            data_text += " "+ele.text.strip()


    return data_text

#the two functions bleow should be puth in chrome driver class
def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(19)
    return driver

def quit_driver(driver):
    driver.quit()

def run():

    url = get_url_of_countries() #this function create its own driver -- to change
    data = {}
    driver = create_driver()

    for country in url:
        driver.implicitly_wait(5)
        name = country
        print(name,"okey")
        href = url[country].get('href')
        advisory_text = url[country].get('advisory-text')
        link = "https://smartraveller.gov.au{}".format(href,sep='')
        visa_info = parse_a_country(link,driver,"Visas")
        if (visa_info == ''):
            visa_info = "na"
        country_iso = "na"
        data[name] = {'country-iso':country_iso,'name':name,'advisory-text':advisory_text,'visa-info':visa_info}

    with open('./advisory-aus.json', 'w') as outfile:
        json.dump(data, outfile)


run()