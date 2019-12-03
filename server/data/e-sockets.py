
# Reading an excel file using Python 
import xlrd 
from helper_class.country_names import find_iso_of_country

def main():   
    # Give the location of the file 
    loc = ("C:/Users/Admin/Desktop/SOEN490/travelingstrategy/server/data/Plugs.xlsx") 
  
    # To open Workbook 
    wb = xlrd.open_workbook(loc) 
    sheet = wb.sheet_by_index(0) 
    sheet.cell_value(0, 0) 
  
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

if __name__ == '__main__':
    main()
