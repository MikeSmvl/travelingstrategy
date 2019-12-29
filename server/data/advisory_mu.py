from helper_class.wiki_visa_parser import wiki_visa_parser
from helper_class.chrome_driver import create_driver, quit_driver

def save_to_MU():
    driver = create_driver()
    wiki_visa_url ="https://en.wikipedia.org/wiki/Visa_requirements_for_Mauritian_citizens"
    wiki_visa_ob = wiki_visa_parser(wiki_visa_url,driver)
    visas = wiki_visa_ob.visa_parser_table()
    print(visas)


if __name__ == '__main__':
    save_to_MU()