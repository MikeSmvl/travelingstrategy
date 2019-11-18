import sqlite3


def save_to_languages():
    con  = sqlite3.connect('../countries.sqlite')
    cur = con.cursor()
    # should not create the table every time
    # change in the future
    cur.execute('DROP TABLE IF EXISTS languages')
    con.commit()
    cur.execute('CREATE TABLE languages (country_iso VARCHAR, primary_languages VARCHAR, other_languages VARCHAR, minority_language VARCHAR, national_language VARCHAR, widely_spoken VARCHAR)')
    con.commit()

    # hard coded values

    cur.execute('INSERT INTO languages (country_iso,primary_languages,other_languages, minority_language, national_language, widely_spoken ) values("CA","English", "French", "Arabic", "Spanish", "Italian" )')
    con.commit()

    con.close()

if __name__ == '__main__':
    save_to_languages()