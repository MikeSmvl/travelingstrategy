const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const databasePath = "./countries.sqlite";
const logger = require('../logger/logger.js')

logger.info(__filename +" Attempting to connect to database")

class database {
  constructor() {
    try {
        if (fs.existsSync(databasePath)) {
            this.db = new sqlite3.Database(databasePath, (err) => {
                if (err) {
                  logger.info(__filename +' Could not connect to database', err)
                } else {
                  logger.info(__filename +' Connected to database')
                }
            })
        }
        else{
          throw err;
        }
      } catch(err) {
        logger.error(__filename +" Database not found")
          this.db = {};
      }
  }
}

module.exports = database;