import sqlite3
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

def get_countries_languages():
    info = {}
    try:
        #this is the link to the first page
        url = 'https://en.wikipedia.org/wiki/List_of_official_languages_by_country_and_territory'

        #set up the headless chrome driver
        chrome_options = Options()
        # chrome_options.add_argument("--headless")
        # create a new chrome session
        driver = webdriver.Chrome(options=chrome_options)
        driver.implicitly_wait(19)
        driver.get(url)
        
        # #Selenium hands the page source to Beautiful Soup
        soup=BeautifulSoup(driver.page_source, 'html.parser')

        # #patter of the link to the country page that the href should match
        # reg = regex.compile(r'\/Countries\/\w+-*\w*\/\w*-*\w*\/*Pages\/\w+-*\w*\.aspx')
        table = soup.find('table', {'class':"wikitable"})
        tbody = table.find('tbody')
        table_rows = tbody.find_all('tr')
        # print(table_rows)
        for tr in table_rows:
            table_columns = tr.find_all('td')
            number_of_columns = len(table_columns)
            index = 0
            if(number_of_columns > 0):
                print("Country-------------------------")
                while(index < number_of_columns):
                    a_tags_array = table_columns[index].find_all('a')
                    for a_tag in a_tags_array:
                        if(a_tag != None):
                            a_tag_text = a_tag.string
                            if((not re.findall("[0-9]", a_tag_text)) and (not re.findall("\[", a_tag_text))):
                                if(index == 0):
                                    country = a_tag_text
                                    print("county: ",country)
                                elif(index == 1):
                                    official_languages = a_tag_text
                                    print("official_languages: ",official_languages)
                                elif(index == 2):
                                    regional_languages = a_tag_text
                                    print("regional_languages: ",regional_languages)
                                elif(index == 3):
                                    minority_languages = a_tag_text
                                    print("minority_languages: ",minority_languages)
                                elif(index == 4):
                                    national_languages = a_tag_text
                                    print("national_languages: ",national_languages)
                                elif(index == 1):
                                    widely_spoken = a_tag_text
                                    print("widely_spoken: ",widely_spoken)
                    index+=1
                print("----------------------END-------------")


            # print(len(table_columns))
            # for td in table_columns:
            #     a_tag = td.find('a')
            #     print("----------------------TD--------------")
            #     print(td)
            #     if(a_tag != None):
            #         a_tag_text = a_tag.string
            #         if(not re.findall("[0-9]", a_tag_text)):
            #             country = a_tag_text
            #             print("----------------------END TD--------------")
            # print("---------------------")
            # print(count)
            # print(tr)
        #     cols = tr.find_all('td')
        #     cols = [ele.text.strip() for ele in cols]

        #     if (cols[1]==''):
        #         cols[1]='No advisory from the australian government'

        #     name = cols[0]
        #     advisory_text = cols[1]
        #     a = tr.find('a', attrs = {'href':reg})
        #     href = a['href']
        #     info[name] = {"href":href,"advisory-text":advisory_text}
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