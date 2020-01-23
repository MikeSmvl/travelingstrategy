const Vaccines = require('../classes/vaccines')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var country_vaccines = {
    type: graphql.GraphQLList(Vaccines),
    args: {
        country_iso: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM vaccines WHERE country_iso ='${args.country_iso}';`
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
}

var vaccines_table = {
    type: graphql.GraphQLList(Vaccines),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM vaccines;`
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
}

module.exports = {country_vaccines,vaccines_table}