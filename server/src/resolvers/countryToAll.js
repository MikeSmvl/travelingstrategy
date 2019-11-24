const Country = require('../classes/country')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var countryTable = {
    type: graphql.GraphQLList(Country),
    args: {
        country_iso: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            logger.info(__filename +"Trying to query 'SELECT * FROM "+args.country_iso+";'")
            db.all(`SELECT * FROM '${args.country_iso}';`, function(err, rows) {
                if(err){
                    logger.error(__filename +" "+err)
                    reject(err);
                }
                logger.info(__filename +"'SELECT * FROM "+args.country_iso+";' successfully queried")
                resolve(rows);
            });
        });
    }
}

module.exports = countryTable