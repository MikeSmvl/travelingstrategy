import helper_class.chrome_driver as driver
from bs4 import BeautifulSoup



def parse_a_country_visa(url):
    info ={}
    my_driver = driver.create_driver()
    my_driver.get(url)
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

         visaPosition = cols[1].find('[')
         visa = cols[1][0 : visaPosition]

         info[name] = {"visa":visa}
    return info
