const CovidStat = require('../classes/covidStat')
const CovidCountry = require('../classes/covidCountry')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var covidStats = {
    type: graphql.GraphQLList(CovidStat),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `select sum(totalCases) as total_cases, sum(totalDeaths) as total_deaths, sum(seriousCritical) as serious_critical, sum(totalRecovered) as total_recovered from covid19;`
            logger.info("Trying to query "+query)
            db.all(query, function(err, rows) {
                if(err){
                    logger.error(err)
                    reject(err);
                }
                logger.info(query+" successfully queried")
                resolve(rows);
            });
        });
    }
};

var covidCountryStats = {
    type: graphql.GraphQLList(CovidCountry),
    args: {
        country: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM covid19 WHERE country ='${args.country}';`
            logger.info("Trying to query "+query)
            db.all(query, function(err, rows) {
                if(err){
                    logger.error(err)
                    reject(err);
                }
                logger.info(query+" successfully queried")
                resolve(rows);
            });
        });
    }
};

var covidAllStats = {
    type: graphql.GraphQLList(CovidCountry),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM covid19;`
            logger.info("Trying to query "+query)
            db.all(query, function(err, rows) {
                if(err){
                    logger.error(err)
                    reject(err);
                }
                logger.info(query+" successfully queried")
                resolve(rows);
            });
        });
    }
};

module.exports = { covidStats, covidCountryStats, covidAllStats }