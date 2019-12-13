import json
import time

import regex
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

import helper_class.chrome_driver as driver
from helper_class.country_names import find_all_iso
from helper_class.sqlite_advisories import sqlite_advisories


#Find all the urls to each country from the
#irish gov website
def find_all_url(my_driver):
    url_to_all = {}
    url_main = 'https://www.dfa.ie/travel/travel-advice/'
    my_driver.get(url_main)
    soup = BeautifulSoup(my_driver.page_source, 'lxml')

    #pattern of the href in the tag
    reg = regex.compile(r'\/travel\/travel-advice\/a-z-list-of-countries\/\w+\/')
    a = soup.findAll('a', attrs={'href':reg})
    for name in a:
        href = "https://www.dfa.ie"+name['href']
        url_to_all[name.text] = {"href":href}

    return url_to_all

#get the advisory of all countries going from ireland
def get_one_advisory(url, my_driver, soup):

    reg = regex.compile(r'shaded\ssecurity-status\s\w+')
    section = soup.find('section', attrs = {'class':reg})
    advisory = section['class'][2]
    advisory_text = ""

    #find the highlighted box and asssign its text to the advisory
    if advisory == 'normal':
        advisory_text = "Normal precautions"
    elif advisory == 'high-caution':
        advisory_text = "High degree of caution"
    elif advisory == 'avoid':
        advisory_text = "Avoid non-essential travel"
    elif advisory == 'do-not':
        advisory_text = "Do not travel"
    else:
        advisory_text = "No advisory"

    return advisory_text

#getting the header and the text that goes with it
def get_one_info(url, to_find, my_driver, soup):

    #on the irish gov it is strong or h3
    par = soup.find_all(regex.compile(r'(p|strong|h3)'))
    re_txt = regex.compile(to_find, regex.IGNORECASE)
    data_found = False
    data_not_to_save = False
    data = ""

    for p in par:
        txt = p.text
        if (re_txt.search(txt)):
            data_not_to_save  = True

        elif (p.name == 'h3') and data_found:
            # if(len(p.find_all('strong')) > 0):
            data_found = False
            break

        elif (p.name == 'p') and data_found:
            if len(p.find_all('strong')) > 0:
                data_found = False
                break

        #when the data is found we skip the first one
        #which is usually the title
        if data_not_to_save:
            data_found = True
            data_not_to_save = False
        #on the second round we save the data
        elif data_found:
            data = data + "<br>"+txt

    return data

def parse_a_country_visa():
    info = {}
    my_driver = driver.create_driver()
    my_driver.get("https://en.wikipedia.org/wiki/Visa_requirements_for_Irish_citizens")
    #Selenium hands the page source to Beautiful Soup
    soup = BeautifulSoup(my_driver.page_source, 'lxml')
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

        visa_position = cols[1].find('[')
        visa = cols[1][0 : visa_position]

        info[name] = {"visa":visa}
    #make the iso the key then return the data
    find_all_iso(info)
    data_new = replace_key_by_iso(info)
    info = data_new
    return info

#function to replace name by iso
def replace_key_by_iso(data):
    data_new = {}
    for k in data:
        iso = data[k].get('country-iso')
        visa_info = data[k].get('visa')
        data_new[iso] = {'name': k, 'visa-info':visa_info}
    return data_new


def save_into_db(data):
    # create an an sqlite_advisory object
    sqlite = sqlite_advisories('IE')
    sqlite.delete_table()
    sqlite.create_table()
    for country in data:
        iso = data[country].get('country-iso')
        name = data[country].get('name')
        text = data[country].get('advisory-text')
        visa_info = data[country].get('visa-info')
        sqlite.new_row(iso, name, text, visa_info)
    sqlite.commit()
    sqlite.close()


#here we go through all countries and save all the data
#it comes from the irish gov website
#for the visa info half comes from wiki
def find_all_ireland():

    my_driver = driver.create_driver()

    all_url = find_all_url(my_driver)
    data = find_all_iso(all_url)
    visa_wiki = parse_a_country_visa()

    for country in data:
        c = data[country]
        url = c['href']
        my_driver.implicitly_wait(5)
        my_driver.get(url)
        soup = BeautifulSoup(my_driver.page_source, 'lxml')
        c['visa-info'] = get_one_info(url, 'visa/passport', my_driver, soup)
        c['advisory-text'] = get_one_advisory(url, my_driver, soup)
        c['name'] = country
        if c['visa-info'] == '':
            c['visa-info'] = get_one_info(url, 'Entry requirements', my_driver, soup)
        iso = c['country-iso']
        #handling some exceptions, had to do research
        if iso == 'AI':
            c['visa-info'] = 'Visa not required for 3 months'
        elif iso == 'BM':
            c['visa-info'] = 'Visa not required for 21 days (extendable)'
        elif iso == 'MQ':
            iso = 'FR'
        elif iso == 'MS':
            c['visa-info'] = 'Visa not required for 6 months'
        elif iso == 'RE':
            iso = 'FR'
        else:
            try:
                c['visa-info'] = visa_wiki[iso].get('visa-info')+ "<br>" + c['visa-info']
            except Exception as error_msg:
                print(c, error_msg)
    #dump the data into js to be deleted later
    driver.quit_driver(my_driver)
    with open('./advisory-ie.json', 'w') as outfile:
        json.dump(data, outfile)

    save_into_db(data)
