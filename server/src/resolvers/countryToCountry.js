const Country = require('../classes/country')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var countryToCountry = {
    type: graphql.GraphQLList(Country),
    args: {
        origin: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        destination: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            logger.info("Trying to query 'SELECT * FROM "+args.origin+" WHERE name="+args.destination+";")
            db.all(`SELECT * FROM '${args.origin}' WHERE name='${args.destination}';`, function(err, rows) {
                if(err){
                    logger.error(err)
                    reject(err);
                }
                logger.info("'SELECT * FROM "+args.name+";' successfully queried")
                resolve(rows);
            });
        });
    }
}

module.exports = countryToCountry