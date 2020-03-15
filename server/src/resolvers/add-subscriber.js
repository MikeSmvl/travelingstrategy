
const Subscriber = require('../classes/subscriber')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;

var addSubscriber = {
    type: graphql.GraphQLList(Subscriber),
    args: {
        email: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        date_of_trip: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        search_term: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        lat: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
        lng: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        },
    },
    resolve: function (source, args) {
        return new Promise((resolve, reject) => {
            query = `INSERT INTO requests VALUES(null,'-1','-1','${args.date_of_trip}','${args.search_term}','${args.email}','${args.lat}','${args.lng}');`
            logger.info("Trying to query "+query)
            db.run(query, function(err, rows) {
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

module.exports = addSubscriber