const Canada = require('../classes/canada')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var canadaAll = {
    type: graphql.GraphQLList(Canada),
    args: {
        name: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            logger.info("Trying to query 'SELECT * FROM "+args.name+";'")
            db.all(`SELECT * FROM canada WHERE name='${args.name}';`, function(err, rows) {
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

module.exports = canadaAll