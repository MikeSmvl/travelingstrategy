from bs4 import BeautifulSoup

class wiki_visa_parser():

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
        table = soup.find('table')
        table_body = table.find('tbody')
        table_rows = table_body.find_all('tr')

        for tr in table_rows:

            cols = tr.find_all('td')
            cols = [ele.text.strip() for ele in cols]
            name = cols[0]

            visaPosition = cols[1].find('[')
            visa = cols[1][0 : visaPosition]
            info[name] = {"visa":visa}

        return info

    def set_url(self, url):
        self.url = url
