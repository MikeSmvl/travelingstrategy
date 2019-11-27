import sqlite3
import re
import pycountry
import numpy as np

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from helper_class.country_names import find_iso_of_country


#Some countries have link, others are listed and others have links while being listed
def get_countries_languages():
    array_of_country_info = []
    info = {}
    try:
        # this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/List_of_official_languages_by_country_and_territory'

        # set up the headless chrome driver
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        # create a new chrome session
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(19)
        driver.get(url)
        # Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')

        # patter of the link to the country page that the href should match
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')

        for tr in table_rows: #each row
            table_columns = tr.find_all('td')
            number_of_columns = len(table_columns)
            country = ""
            languages = [[],[],[],[],[]]
            if(number_of_columns > 0): #Headers don't have column tags
                country = get_country_name(number_of_columns,table_columns[0]) #first column is the country name
            index = 1 # languages start on the second column
            if(number_of_columns > 0): #Headers don't have column tags
                while(index < number_of_columns):
                    li_tags_array = table_columns[index].find_all('li') #For languages displayed as a list
                    a_tags_array = table_columns[index].find_all('a') #For languages displayed as a list

                    if(len(li_tags_array) > 0): #Listed
                        languages.append(get_languages_displayed_in_list(languages, li_tags_array,index))
                    else: #Not Listed
                        languages.append(get_languages_not_displayed_in_list(languages,a_tags_array, table_columns,index))
                    index+=1
            array_of_country_info = get_country_info_object(languages, array_of_country_info, country)
        print(array_of_country_info)
        return(array_of_country_info)

    finally:
        driver.close()
        driver.quit()

def get_country_info_object(languages, array_of_country_info, country):
    country_iso = find_iso_of_country(country)
    if(not(country_iso == "")):
        info = {
            "country_iso": country_iso,
            "country_name": country,
            "official_languages": languages[0],
            "regional_languages": languages[1],
            "minority_languages": languages[2],
            "national_languages": languages[3],
            "widely_spoken_languages": languages[4]
        }
        array_of_country_info.append(info)
    return array_of_country_info

def get_concatinated_values(array_values):
    concatinated_values = ""
    seperator = ', '
    if(array_values == None or (array_values != None and len(array_values) <= 0)):
        return ""
    for value in array_values:
        concatinated_values = seperator.join(array_values)
    return concatinated_values


def get_country_name(number_of_columns, table_column):
    country= ""
    index = 0
    a_tag= table_column.find('a')
    if(a_tag != None): #The headers do not count
        a_tag_text = a_tag.string
    if((not re.findall("[0-9]", a_tag_text)) and (not re.findall("\[", a_tag_text))):
        if(index == 0):
            country = a_tag_text
    return country

def get_languages_displayed_in_list(languages, li_tags_array, index):
    for li_tag in li_tags_array:
        if(li_tag != None): #Headers have values none
            a_tag = li_tag.find('a')
            super_script_tag = li_tag.find('sup')
            li_tag_text = li_tag.string
            if(a_tag != None and super_script_tag == None): #countries with links and that don't have a superscript number
                a_tag_text = a_tag.string
                languages.append(get_languages_from_tag(languages, a_tag_text, index))
            else:
                li_tag_text = li_tag.text
                li_tag_text = remove_brackets_from_text(li_tag_text)
                languages.append(get_languages_from_tag(languages, li_tag_text, index))
    return languages

def get_languages_not_displayed_in_list(languages, a_tags_array,table_columns, index):
    if(len(a_tags_array) > 0):
        a_tag = table_columns[index].find('a') #countries with links
        super_script_tag = table_columns[index].find('sup')
        a_tag_text = a_tag.text
        if(a_tag != None and super_script_tag == None): #Not listed Not Linked
            languages.append(get_languages_from_tag(languages, a_tag_text, index))

        else: #If not listed linked and superscripted
            td_tag = table_columns[index]
            if(td_tag != None):
                td_tag_text = td_tag.text.strip('\n') #remove carriage return
                td_tag_text = remove_brackets_from_text(td_tag_text)
                languages.append(get_languages_from_tag(languages, td_tag_text, index))
    else: #Case where not listed not linked in td
        td_tag = table_columns[index]
        if(td_tag != None):
            td_tag_text = td_tag.text.strip('\n') #remove carriage return
            td_tag_text = remove_brackets_from_text(td_tag_text)
            languages.append(get_languages_from_tag(languages, td_tag_text, index))
    return languages

def get_languages_from_tag(languages, tag_text, index):
    if(((not re.findall("[0-9]", tag_text)) or (not re.findall("\[", tag_text))) and (not (re.findall("languages", tag_text)))):
        if(tag_text != None and tag_text != ''):
            if(index == 1):
                languages[0].append(tag_text) #official Languages
            elif(index == 2):
                languages[1].append(tag_text) #regional Languages
            elif(index == 3):
                languages[2].append(tag_text) #Minority Languages
            elif(index == 4):
                languages[3].append(tag_text) #National Languages
            elif(index == 5):
                languages[4].append(tag_text) #Widely spoken Languages
        return languages

def remove_brackets_from_text(tag_text):
    if(re.findall("\[",tag_text)): #if it has brackets
        index_of_bracket = tag_text.index("[")
        tag_text = tag_text[:index_of_bracket]
    return tag_text

def save_to_languages():
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()
    # should not create the table every time
    # change in the future
    cur.execute('DROP TABLE IF EXISTS languages')
    con.commit()
    cur.execute('CREATE TABLE languages (country_iso VARCHAR, country_name VARCHAR, official_languages VARCHAR, regional_languages VARCHAR, minority_languages VARCHAR, national_languages VARCHAR, widely_spoken_languages VARCHAR)')
    con.commit()

    countries_data = get_countries_languages()
    for country in countries_data:
        country_iso = country.get('country_iso')
        country_name = country.get('country_name')
        official_languages = get_concatinated_values(country.get('official_languages'))
        regional_languages = get_concatinated_values(country.get('regional_languages'))
        minority_languages = get_concatinated_values(country.get('minority_languages'))
        national_languages = get_concatinated_values(country.get('national_languages'))
        widely_spoken_languages = get_concatinated_values(country.get('widely_spoken_languages'))

        cur.execute('INSERT INTO languages (country_iso,country_name,official_languages,regional_languages, minority_languages, national_languages, widely_spoken_languages ) values( ?, ?, ?, ?, ?, ?, ?)',(country_iso,country_name,official_languages,regional_languages, minority_languages, national_languages, widely_spoken_languages))
    con.commit()
    con.close()

