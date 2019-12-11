const Financial = require('../classes/financial')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var financials = {
    type: graphql.GraphQLList(Financial),
    args: {
        country: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM financials WHERE country ='${args.country}';`
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

module.exports = financials