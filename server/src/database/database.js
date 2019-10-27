const sqlite3 = require('sqlite3').verbose();

class database {
  constructor() {
    this.db = new sqlite3.Database("../store.sqlite", (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }
}

module.exports = database;