import sqlite3

con  = sqlite3.connect('../../newzealand.sqlite')
cur = con.cursor()
#should not create the table every time
#change in the future
cur.execute('DROP TABLE IF EXISTS newzealand')
con.commit()
cur.execute('CREATE TABLE newzealand (country_iso VARCHAR, name VARCHAR, advisory_text VARCHAR, visa_info VARCHAR)')
con.commit()

# hard coded values

cur.execute('INSERT INTO newzealand (country_iso,name,advisory_text,visa_info) values("CA","Canada","Exercise normal precautions","Tourist Visa not required")')
con.commit()

con.close()