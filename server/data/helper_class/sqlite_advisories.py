import sqlite3

class sqlite_advisories:

    def __init__(self, country_name):
        self.con = sqlite3.connect('../countries.sqlite')
        self.cur = self.con.cursor()
        self.country_name = country_name

    def create_table(self):
        self.cur.execute('CREATE TABLE '+self.country_name+' (country_iso VARCHAR, name VARCHAR, advisory_text VARCHAR(10000), visa_info VARCHAR)')
        self.con.commit()

    def delete_table(self):
        self.cur.execute("DROP TABLE IF EXISTS %s"%(self.country_name))

    def new_row(self,iso, name, advisory_text,visa_info):
        self.cur.execute('INSERT INTO '+self.country_name+' (country_iso,name,advisory_text,visa_info) values(?,?,?,?)',(iso,name,advisory_text,visa_info))

    def commit(self):
        self.con.commit()

    def close(self):
        self.con.close()