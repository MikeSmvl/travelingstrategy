
class wiki_weather_parser:

    def __init__(self, url, driver):
        self.url = url
        self.driver = driver

    #This is the parser for the main tables which include
    def visa_parser_table(self):

        info ={}
        self.driver.get(self.url)
        #Selenium hands the page source to Beautiful Soup
        soup = BeautifulSoup(self.driver.page_source, 'lxml')
        visa = " "
        all_tables = soup.findAll('table', {"class": "wikitable"})[0:6]
        for table in all_tables:
            table_body = table.find('tbody')
            table_rows = table_body.find_all('tr')
            x = 0
            for tr in table_rows:
                # x = x+1
                cols = tr.find_all('td')
                cols = [ele.text.strip() for ele in cols]
                if(len(cols) > 0): #To avoid parsing table headers and antartica
                    country_name = cols[0]
                    city_name = cols[1]
                    january_temp = cols[2].split('(')[0]
                    february_temp = cols[3].split('(')[0]
                    march_temp = cols[4].split('(')[0]
                    april_temp = cols[5].split('(')[0]
                    may_temp = cols[6].split('(')[0]
                    june_temp = cols[7].split('(')[0]
                    july_temp = cols[8].split('(')[0]
                    august_temp = cols[9].split('(')[0]
                    septembre_temp = cols[10].split('(')[0]
                    octobre_temp = cols[11].split('(')[0]
                    novembre_temp = cols[12].split('(')[0]
                    decembre_temp = cols[13].split('(')[0]

                    info[city_name] = {"january":january_temp, "february":february_temp, "march":march_temp, "april":april_temp, "may":may_temp, "june":june_temp, "july":july_temp, "august":august_temp, "septembre":septembre_temp, "octobre":octobre_temp, "novembre":novembre_temp, "decembre":decembre_temp }

        return info

    def set_url(self, url):
        self.url = url
