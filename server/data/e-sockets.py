
# Reading an excel file using Python
import xlrd
import pandas as pd
import sqlite3
from helper_class.country_names import find_iso_of_country
import pycountry

def remove_duplicate_countries():
    #accessing excel sheet as dataframes
    df = pd.read_excel('./Plugs.xlsx')
    #removing duplicates and joining by the plug type attribute
    dataFrame = df.groupby(['Location','Electric Potential','Frequency'])['Plug Type'].apply(', '.join).reset_index()
    #create a write to create a new excel sheet without any of the duplicates
    writer = pd.ExcelWriter('./e_sockets.xlsx')
    #saving the contents into the new excel file
    dataFrame.to_excel(writer, 'e_sockets')
    #saving the new data
    writer.save()

def get_countries_sockets():
    # Give the location of the file
    loc = "./e_sockets.xlsx" #mac
    # loc = "server/data/e_sockets.xlsx"  #pc

    # To open Workbook
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)
    sheet.cell_value(0, 0)
    arrayOfInfo = []
    #loop for every row and grab the values
    for row in range(sheet.nrows):
        country_name = sheet.cell_value(row, 0)
        electric_potential = sheet.cell_value(row, 1)
        frequency = sheet.cell_value(row, 2)
        plug_type = sheet.cell_value(row, 3)
        iso = find_iso_of_country(country_name)
        info = {
            "name":country_name,
            "iso": iso,
            "plug_type": plug_type,
            "electric_potential": electric_potential,
            "frequency": frequency
        }
        arrayOfInfo.append(info)

    return arrayOfInfo

def save_electrical_sockets():
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()
    # should not create the table every time
    # change in the future
    cur.execute('DROP TABLE IF EXISTS sockets')
    con.commit()
    cur.execute('CREATE TABLE sockets (country_iso VARCHAR, country_name VARCHAR, plug_type VARCHAR, electric_potential VARCHAR, frequency VARCHAR)')
    con.commit()

    countries_data = get_countries_sockets()
    for country in countries_data:
        country_iso = country.get('iso')
        country_name = country.get('name')
        plug_type = country.get('plug_type')
        electric_potential = country.get('electric_potential')
        frequency = country.get('frequency')
        print(country)
        cur.execute('INSERT INTO sockets (country_iso,country_name,plug_type,electric_potential,frequency) values( ?, ?, ?, ?, ?)',(country_iso,country_name,plug_type,electric_potential,frequency))
    con.commit()
    con.close()

save_electrical_sockets()
