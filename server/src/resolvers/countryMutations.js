const Country = require('../classes/country')
const graphql = require('graphql');
const inputCountry = require('../classes/inputCountry')
const database = require("../database/database");
const logger = require("../logger/logger.js")
const db = new database().db;

var addCountryToCountry = {
  type: graphql.GraphQLList(Country),
    args: {
      origin: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLString)
      },
      input: {
          type: inputCountry
      }
    },
    resolve: function (source, args) {
      return new Promise((resolve, reject) => {
          logger.info("Trying to query 'INSERT INTO "+args.origin+",(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");'")
          db.run(`INSERT INTO '${args.origin}'(country_iso,name,advisory_text, visa_info) VALUES(?,?,?,?);`,[args.input.country_iso, args.input.name, args.input.advisory_text, args.input.visa_info ], function(err, rows) {
              if(err){
                  logger.error(err);
                  reject(err);
              }
              logger.info("'INSERT INTO "+args.origin+",(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");' successfully queried")
              resolve(rows);
          });
      });
  }
}

module.exports = {addCountryToCountry}