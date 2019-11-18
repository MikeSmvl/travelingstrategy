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
          logger.info(__filename +"Trying to query 'INSERT INTO "+args.origin+",(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");'")
          db.run(`INSERT INTO '${args.origin}'(country_iso,name,advisory_text, visa_info) VALUES(?,?,?,?);`,[args.input.country_iso, args.input.name, args.input.advisory_text, args.input.visa_info ], function(err, rows) {
              if(err){
                  logger.error(err);
                  reject(err);
              }
              logger.info(__filename +"'INSERT INTO "+args.origin+",(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");' successfully queried")
              resolve(rows);
          });
      });
  }
}

var deleteCountryToCountry = {
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
          queryString = `DELETE FROM ${args.origin} where country_iso="${args.input.country_iso}" and name="${args.input.name}" and advisory_text="${args.input.advisory_text}" and visa_info="${args.input.visa_info}";`
          logger.info(__filename +"Trying to query ' "+queryString+"'")
          db.run(queryString, function(err, rows) {
              if(err){
                  logger.error(__filename + " " +err);
                  reject(err);
              }
              logger.info(__filename +"'DELETE FROM "+args.origin+"(country_iso,name,advisory_text, visa_info) VALUES("+args.input.country_iso+","+args.input.name+","+args.input.advisory_text+","+args.input.visa_info+");' successfully queried")
              resolve(rows);
          });
      });
  }
}

module.exports = {addCountryToCountry, deleteCountryToCountry}