import sqlite3
from config import sqlite_db

class database:

    def __init__(self):
        self.db = sqlite3.connect('./dberino.sqlite')

    def add_table(self, table_name, **columns):
        """
        Adds a table in the database

        :param table_name:  Name of the table to be created.
        :param **columns:  Rest of the arguments in the following format: title="text", id="int", etc.
        """

        self.cols = ""

        for col_name, col_type in columns.items():
            self.cols += col_name+" "+col_type+","
        self.cols = self.cols[0:len(self.cols)-1]

        self.db.execute("CREATE TABLE IF NOT EXISTS {}({})".format(
            table_name, self.cols))


    def insert(self, table_name, *data):
        """
        Inserts a row in a table

        :param table_name:  Name of the table to be used.
        :param **data:  Rest of the arguments which should be ordered like the columns in the table.
        """
        self.data = ""
        for value in data:
            self.data += '"'+value+'"'+','
        self.data = self.data[0:len(self.data)-1]

        self.db.execute("INSERT INTO {} values({})".format(
            table_name, self.data))
        self.db.commit()


    def remove(self, table_name, where="1"):
        """
        Remove a row in a table where a statement matches

        :param table_name:  Name of the table to be used.
        :param where: Condition to be used for removal.
        """
        self.where = where
        self.db.execute("DELETE FROM {} WHERE {}".format(
            table_name, self.where))
        self.db.commit()


    def update(self, table_name, where, **columns):
        """
        Update row(s) in table where condition is met

        :param table_name:  Name of the table to be used.
        :param where: Condition to be used for update.
        :param **columns: Columns and values that will replace rows where condition is met.
        """
        self.cols = ""

        for col_name, col_type in columns.items():
            self.cols += col_name+" "+col_type+","
        self.cols = self.cols[0:len(self.cols)-1]

        self.db.execute("UPDATE {} SET {} where {}".format(
            table_name, self.cols, where))


    def get_items(self, table_name, where=1):
        """
        Get row(s) in table where condition is met

        :param table_name:  Name of the table to be used.
        :param where: Condition to be used.
        """
        if(table_name != 1):
            self.where = where
            self.items = self.db.execute(
                "SELECT * FROM {} WHERE {}".format(table_name, self.where))
            self.db.commit()
            return list(self.items)
        else:
            return {}

    # return list of tables
    def get_tables(self):
        self.tables = self.db.execute("SELECT name FROM sqlite_master")
        return list(self.tables)

    # execute sqlite query
    def query(self, query_string):
        self.db.execute(query_string)
        self.db.commit()

    # close database connection
    def close_connection(self):
        self.db.close()
