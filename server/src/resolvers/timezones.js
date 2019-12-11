const City_Timezone = require('../classes/city-timezones')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var time_difference = {
    type: graphql.GraphQLList(City_Timezone),
    args: {
        lat_origin: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        lng_origin: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        lat_destination: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        lng_destination: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM timezones WHERE (lat=${args.lat_origin} and lng=${args.lng_origin}) or (lat=${args.lat_destination} and lng=${args.lng_destination});`
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

module.exports = time_difference