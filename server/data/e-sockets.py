
# Reading an excel file using Python 
import xlrd 
import pandas as pd
from helper_class.country_names import find_iso_of_country

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
    loc = "./e_sockets.xlsx" 
  
    # To open Workbook 
    wb = xlrd.open_workbook(loc) 
    sheet = wb.sheet_by_index(0) 
    sheet.cell_value(0, 0) 
  
    #loop for every row and grab the values 
    for row in range(sheet.nrows):
        country_name = sheet.cell_value(row, 0)
        plug_type = sheet.cell_value(row, 1)
        electric_potential = sheet.cell_value(row, 2)
        frequency = sheet.cell_value(row, 3)
        iso = find_iso_of_country(country_name)
        info = {
            "name":country_name,
            "iso": iso,
            "plug type": plug_type,
            "electric potential": electric_potential,
            "frequency": frequency
        }
        print(info)

def save_electrical_sockets():
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()

    cur.execute('DROP TABLE IF EXISTS sockets')
    con.commit()
    cur.execute('CREATE TABLE sockets (country_iso VARCHAR, country_name VARCHAR, types VARCHAR)')
    con.commit()


    socket_data = get_electrical_sockets()
    # something needs to change here

    con.commit()
    con.close()
    
if __name__ == '__main__':
    # remove_duplicate_countries()
    get_countries_sockets()
