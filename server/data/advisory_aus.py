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

            print(cols[0],"\n",cols[1])
            a = tr.find('a', attrs = {'href':reg})
            href = a['href']
            print(href)


    finally:
        driver.close()
        driver.quit()


#this function is to parse only one country
#after getting its url from
def parse_a_country(url,driver):
    driver.get(url)
    #Selenium hands the page source to Beautiful Soup
    soup=BeautifulSoup(driver.page_source, 'lxml')
    strong = soup.find_all('strong')


    print("RESULT")
    for l in strong:
        print(l)

#the two functions bleow should be puth in chrome driver class
def create_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(19)
    return driver

def quit_driver(driver):
    driver.quit()

driver = create_driver()
parse_a_country('https://smartraveller.gov.au/Countries/americas/south/Pages/paraguay.aspx',driver)
parse_a_country('https://smartraveller.gov.au/Countries/americas/south/Pages/paraguay.aspx',driver)
quit_driver(driver)

# with open('./advisory-aus.json', 'w') as outfile:
#     json.dump(nodata, outfile)
