const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const databasePath = "../canada.sqlite";


class database {
  constructor() {
    try {
        if (fs.existsSync(databasePath)) {
            this.db = new sqlite3.Database(databasePath, (err) => {
                if (err) {
                console.log('Could not connect to database', err)
                } else {
                console.log('Connected to database')
                }
            })
        }
      } catch(err) {
            console.log("Database not found")
            this.db = {};
      }
  }
}

module.exports = database;