import sqlite3
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

#Some countries have link, others are listed and others have links while being listed
def get_countries_languages():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/List_of_official_languages_by_country_and_territory'

        #set up the headless chrome driver
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        # create a new chrome session
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(19)
        driver.get(url)
        
        # #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')

        # #patter of the link to the country page that the href should match
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')
        for tr in table_rows:
            table_columns = tr.find_all('td')
            number_of_columns = len(table_columns)
            index = 0
            country = ""
            official_languages = [] #array of offcial languages
            regional_languages = []
            minority_languages = []
            national_languages = []
            widely_spoken_languages = []
            if(number_of_columns > 0):
                a_tag= table_columns[index].find('a')
                if(a_tag != None): #The headers do not count
                    a_tag_text = a_tag.string
                    if((not re.findall("[0-9]", a_tag_text)) and (not re.findall("\[", a_tag_text))):
                        if(index == 0):
                            country = a_tag_text
            index = 1
            if(number_of_columns > 0):
                while(index < number_of_columns):
                    li_tags_array = table_columns[index].find_all('li') #For languages displayed as a list
                    a_tags_array = table_columns[index].find_all('a') #For languages displayed as a list

                    if(len(li_tags_array) > 0): #Listed
                        for li_tag in li_tags_array:
                            if(li_tag != None): #The headers do not count
                                a_tag = li_tag.find('a') #countries with links
                                if(a_tag != None):
                                    a_tag_text = a_tag.string
                                    if(((not re.findall("[0-9]", a_tag_text)) or (not re.findall("\[", a_tag_text))) and (not (re.findall("languages", a_tag_text)))):
                                        if(index == 1):
                                            official_languages.append(a_tag_text)
                                        elif(index == 2):
                                            regional_languages.append(a_tag_text)
                                        elif(index == 3):
                                            minority_languages.append(a_tag_text)
                                        elif(index == 4):
                                            national_languages.append(a_tag_text)
                                        elif(index == 5):
                                            widely_spoken_languages.append(a_tag_text)
                                else:
                                    li_tag_text = li_tag.string
                                    if(((not re.findall("[0-9]", a_tag_text)) or (not re.findall("\[", a_tag_text))) and (not (re.findall("languages", a_tag_text)))):
                                        if(index == 1):
                                            official_languages.append(li_tag_text)
                                        elif(index == 2):
                                            regional_languages.append(li_tag_text)
                                        elif(index == 3):
                                            minority_languages.append(li_tag_text)
                                        elif(index == 4):
                                            national_languages.append(li_tag_text)
                                        elif(index == 5):
                                            widely_spoken_languages.append(li_tag_text)
                    else: #Not Listed
                        if(len(a_tags_array) > 0): #Not Listed
                            a_tag = table_columns[index].find('a') #countries with links
                            if(a_tag != None): #Not listed Not Linked
                                a_tag_text = a_tag.string
                                if(((not re.findall("[0-9]", a_tag_text)) or (not re.findall("\[", a_tag_text))) and (not (re.findall("languages", a_tag_text)))):
                                    if(index == 1):
                                        official_languages.append(a_tag_text)
                                    elif(index == 2):
                                        regional_languages.append(a_tag_text)
                                    elif(index == 3):
                                        minority_languages.append(a_tag_text)
                                    elif(index == 4):
                                        national_languages.append(a_tag_text)
                                    elif(index == 5):
                                        widely_spoken_languages.append(a_tag_text)
                        else: #Case where not listed not linked directly in td
                            td_tag = table_columns[index]
                            if(td_tag != None):
                                td_tag_text = td_tag.string.strip('\n') #remove carriage return
                                if(((not re.findall("[0-9]", td_tag_text)) or (not re.findall("\[", td_tag_text))) and (not (re.findall("languages", td_tag_text)))):
                                    if(not(td_tag_text == "")):
                                        if(index == 1):
                                            official_languages.append(td_tag_text)
                                        elif(index == 2):
                                            regional_languages.append(td_tag_text)
                                        elif(index == 3):
                                            minority_languages.append(td_tag_text)
                                        elif(index == 4):
                                            national_languages.append(td_tag_text)
                                        elif(index == 5):
                                            widely_spoken_languages.append(td_tag_text)
                    index+=1
            if(not(country == "")):
                print("------------------")
                print("country: "+country)
                print("official_languages: ",official_languages)
                print("regional_languages: ",regional_languages)
                print("minority_languages: ",minority_languages)
                print("national_languages: ",national_languages)
                print("widely_spoken_languages: ",widely_spoken_languages)
                print("------------------")



    finally:
        driver.close()
        driver.quit()


def save_to_languages():
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()
    # should not create the table every time
    # change in the future
    cur.execute('DROP TABLE IF EXISTS languages')
    con.commit()
    cur.execute('CREATE TABLE languages (country_iso VARCHAR, primary_languages VARCHAR, other_languages VARCHAR, minority_languages VARCHAR, national_languages VARCHAR, widely_spoken VARCHAR)')
    con.commit()

    # hard coded values

    cur.execute('INSERT INTO languages (country_iso,primary_languages,other_languages, minority_languages, national_languages, widely_spoken ) values("CA","English", "French", "Arabic", "Spanish", "Italian" )')
    con.commit()

    con.close()

if __name__ == '__main__':
    get_countries_languages()