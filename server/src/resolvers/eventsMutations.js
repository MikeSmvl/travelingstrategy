const Event = require('../classes/event')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;



var addEvents = {
    type: graphql.GraphQLList(Event),
    args: {
     request_id: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      event_category: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      description: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      duration: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      start_date: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      end_date: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      title: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      labels: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      address: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      place_type: {
           type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
      name_of_place: {
          type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    },
    resolve: function (source, args) {
        return new Promise((resolve, reject) => {
            query = `INSERT INTO chosen_events VALUES("${args.request_id}","${args.event_category}",
               "${args.description}","${args.duration}","${args.start_date}","${args.end_date}",
               "${args.title}","${args.labels}","${args.address}","${args.place_type}",
               "${args.name_of_place}");`
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


module.exports = addEvents

