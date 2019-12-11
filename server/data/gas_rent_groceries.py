import datetime
import sys

from helper_class.api_helper import ApiHelper
from helper_class.flags import Flags
from helper_class.logger import Logger
from lib.config import (gas_rent_grocery_api, iso_list, new_york_grocery,
                        new_york_rent, new_york_salary, sqlite_db)
from lib.database import Database

# Initialize flags and logger
FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()

# get current date (especially interested in the week_number)
CURRENT_DATE = datetime.date.today()
YEAR, WEEK_NUMBER, DAY_OF_WEEK = CURRENT_DATE.isocalendar()

# Initialize database
DB = Database(sqlite_db)

# Create table if it does not exists
DB.add_table('financials', country='text', gasoline='text',
             rent='text', groceries='text')

GASOLINE_API = f'http://knoema.com/api/1.0/data/GPPW?time=2019W{WEEK_NUMBER - 1}&country=1000310,1001270,1001770,1000030,1001630,1000000,1000010,1000040,1000060,1000100,1000090,1000080,1000110,1000210,1000150,1000140,1000170,1000260,1000250,1000130,1000280,1001780,1000200,1000240,1000120,1000190,1000220,1000160,1000180,1001820,1001500,1000760,1000350,1000300,1000360,1000370,1000380,1000400,1000320,1000410,1000420,1000570,1000430,1000440,1000450,1000020,1000460,1000490,1000470,1001420,1000500,1000520,1000510,1000530,1000540,1000550,1000600,1000560,1000580,1000620,1000590,1000610,1000630,1000660,1000650,1000390,1000640,1000670,1000700,1000730,1000740,1000690,1000720,1000710,1000680,1000750,1000770,1000790,1000780,1000810,1000830,1000290,1001410,1000820,1000330,1000800,1000840,1000860,1001310,1000890,1001430,1000880,1000870,1000900,1000910,1000850,1000960,1001040,1001030,1001060,1000930,1000920,1000970,1000270,1000990,1000980,1001000,1000940,1001020,1000950,1001080,1001090,1001150,1001130,1001110,1001160,1001100,1001120,1001170,1001190,1001210,1001220,1001180,1001230,1001250,1001240,1001200,1001260,1001280,1001350,1001290,1001300,1001330,1001460,1001490,1001370,1001390,1001380,1001360,1001320,1001340,1001470,1000480,1001480,1000340,1001450,1001550,1001600,1001580,1001590,1001570,1001520,1001540,1001620,1001610,1001660,1001650,1001670,1001680,1001690,1001840,1001700,1001010,1001400,1001710,1001720,1001800,1000050,1000070,1000230,1001140,1001790,1001530,1001510,1001640,1001070,1001050,1001440,1001560&indicator=1000030&measure=1000000&frequencies=W&client_id=5ebf6ad1-8e6c-475c-9344-ca72734558b9'
RENT_API = 'http://knoema.com/api/1.0/data/COOFLIIND2016?time=&uiMode=last&uiParams=1&country=1000020,1000030,1000040,1000050,1000060,1000070,1000080,1000090,1000120,1000130,1000140,1000150,1000160,1000180,1000190,1000200,1000220,1000230,1000260,1001550,1001530,1000270,1000280,1000290,1000300,1000320,1000330,1000340,1000350,1000360,1000370,1000380,1000390,1000410,1000420,1000430,1000450,1000460,1000470,1000480,1000490,1000500,1000510,1000520,1000530,1000540,1000570,1000580,1000600,1000610,1000620,1000630,1000640,1000650,1000660,1000680,1000690,1000700,1000710,1000720,1000730,1000750,1000760,1000770,1000780,1000790,1000800,1000810,1000820,1000830,1000850,1000860,1000870,1000880,1000890,1000900,1000910,1000920,1000930,1000940,1000950,1000960,1000970,1000980,1000990,1001000,1001010,1001040,1001050,1001060,1001070,1001080,1001090,1001100,1001110,1001120,1001130,1001150,1001160,1001170,1001180,1001190,1001200,1001210,1001220,1001230,1001240,1001260,1001270,1001280,1001290,1001300,1001310,1001320,1001330,1001340,1001350,1001360,1001370,1001380,1001400,1001410,1001420,1001430,1001440,1001450,1001460,1001470,1001490,1001500,1001510&indicator=1000010&frequencies=A'
GROCERIES_API = 'http://knoema.com/api/1.0/data/COOFLIIND2016?time=&uiMode=last&uiParams=1&country=1000820,1000020,1000030,1000040,1000050,1000060,1000070,1000080,1000090,1000120,1000130,1000140,1000150,1000160,1000180,1000190,1000200,1000220,1000230,1000260,1001550,1001530,1000270,1000280,1000290,1000300,1000320,1000330,1000340,1000350,1000360,1000370,1000380,1000390,1000410,1000420,1000430,1000450,1000460,1000470,1000480,1000490,1000500,1000510,1000520,1000530,1000540,1000570,1000580,1000600,1000610,1000620,1000630,1000640,1000650,1000660,1000680,1000690,1000700,1000710,1000720,1000730,1000750,1000760,1000770,1000780,1000790,1000800,1000810,1000830,1000850,1000860,1000870,1000880,1000890,1000900,1000910,1000920,1000930,1000940,1000950,1000960,1000970,1000980,1000990,1001000,1001010,1001040,1001050,1001060,1001070,1001080,1001090,1001100,1001110,1001120,1001130,1001150,1001160,1001170,1001180,1001190,1001200,1001210,1001220,1001230,1001240,1001260,1001270,1001280,1001290,1001300,1001310,1001320,1001330,1001340,1001350,1001360,1001370,1001380,1001400,1001410,1001420,1001430,1001440,1001450,1001460,1001470,1001490,1001500,1001510&indicator=1000030&frequencies=A'


def gasoline_data(api_link):
    LOGGER.info(f'Beginning gasoline price parsing')
    api_url_gasoline = ApiHelper(api_link)
    json_data_gasoline = api_url_gasoline.get_json()['data']
    gasoline_price_dict = {}
    for region in json_data_gasoline:
        try:
            data_to_insert = region['Value']
            LOGGER.success(
                f'Country: {region["RegionId"]} -> Current gasoline cost: {data_to_insert}')
            LOGGER.info('Inserting data into database.')
            gasoline_price_dict[region['RegionId']] = str(data_to_insert)
        except Exception as error_msg:
            LOGGER.error(
                f'Could not get gasoline data for {region["RegionId"]} because of the following error: {error_msg}')
    return gasoline_price_dict

def rent_data(api_link):
    LOGGER.info(f'Beginning rent price parsing')
    api_url_rent = ApiHelper(api_link)
    json_data_rent = api_url_rent.get_json()['data']
    rent_price_dict = {}
    for region in json_data_rent:
        try:
            data_to_insert = region['Value']
            LOGGER.success(
                f'Country: {region["RegionId"]} -> Current rent cost: {data_to_insert}')
            LOGGER.info('Inserting data into database.')
            rent_price_dict[region['RegionId']] = str(data_to_insert)
        except Exception as error_msg:
            LOGGER.error(
                f'Could not get rent data for {region["RegionId"]} because of the following error: {error_msg}')
    return rent_price_dict


def groceries_data(api_link):
    LOGGER.info(f'Beginning groceries price parsing')
    api_url_groceries = ApiHelper(api_link)
    json_data_groceries = api_url_groceries.get_json()['data']
    groceries_price_dict = {}
    for region in json_data_groceries:
        try:
            data_to_insert = region['Value']
            LOGGER.success(
                f'Country: {region["RegionId"]} -> Current groceries cost: {data_to_insert}')
            LOGGER.info('Inserting data into database.')
            groceries_price_dict[region['RegionId']] = str(data_to_insert)
        except Exception as error_msg:
            LOGGER.error(
                f'Could not get groceries data for {region["RegionId"]} because of the following error: {error_msg}')
    return groceries_price_dict

def store_db():
    GASOLINE_PRICE_DICT = gasoline_data(GASOLINE_API)
    RENT_PRICE_DICT = rent_data(RENT_API)
    GROCERIES_PRICE_DICT = groceries_data(GROCERIES_API)

    for country in iso_list:
        if country not in GASOLINE_PRICE_DICT:
            GASOLINE_PRICE_DICT[country] = 'TBD'
        if country not in RENT_PRICE_DICT:
            RENT_PRICE_DICT[country] = 'TBD'
        if country not in GROCERIES_PRICE_DICT:
            GROCERIES_PRICE_DICT[country] = 'TBD'
        try:
            DB.insert_or_update('financials', country, GASOLINE_PRICE_DICT[country], RENT_PRICE_DICT[country], GROCERIES_PRICE_DICT[country])
        except Exception as error_msg:
            print(f'Could not store financial data for country {country} with error: {error_msg}')

store_db()