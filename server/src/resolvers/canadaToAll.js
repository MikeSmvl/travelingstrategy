const Canada = require('../classes/canada')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var canadaAll = {
    type: graphql.GraphQLList(Canada),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            logger.info("Trying to query 'SELECT * FROM canada;'")
            db.all("SELECT * FROM canada;", function(err, rows) {
                if(err){
                    logger.error(err)
                    reject(err);
                }
                logger.info("'SELECT * FROM canada;' successfully queried")
                resolve(rows);
            });
        });
    }
}

module.exports = canadaAll