const UnitedNations = require('../classes/unitedNations')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var unitedNations = {
    type: graphql.GraphQLList(UnitedNations),
    args: {
        country: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM un WHERE country ='${args.country}';`
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

module.exports = unitedNations