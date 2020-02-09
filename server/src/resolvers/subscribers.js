const Subscriber = require('../classes/subscriber')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var subscriberTable = {
    type: graphql.GraphQLList(Subscriber),

    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM subscribers;`
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

module.exports = subscriberTable;