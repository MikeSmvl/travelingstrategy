const Country = require('../classes/country')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var countryTable = {
    type: graphql.GraphQLList(Country),
    args: {
        name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            logger.info(__filename +"Trying to query 'SELECT * FROM "+args.name+";'")
            db.all(`SELECT * FROM '${args.name}';`, function(err, rows) {
                if(err){
                    logger.error(__filename +" "+err)
                    reject(err);
                }
                logger.info(__filename +"'SELECT * FROM "+args.name+";' successfully queried")
                resolve(rows);
            });
        });
    }
}

module.exports = countryTable