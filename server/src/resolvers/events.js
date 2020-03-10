const Event = require('../classes/event')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var eventsForRequest = {
    type: graphql.GraphQLList(Event),
    args: {
        request_id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM chosen_events WHERE request_id ='${args.request_id}';`
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


        }
    },
    resolve: function(source, args, context) {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO chosen_events VALUES(?,?,?,?,?,?,?,?,?,?,?);`,
          [args.request_id, args.event_category, ],
          function(err) {
            if (err) {
              logger.error(err);
              reject(err);
            } else {
              db.get(
                'SELECT * FROM user ORDER BY user_id DESC LIMIT 1;',
                (err, row) => {
                  if (err) {
                    logger.error(err);
                    reject(err);
                  }
                  resolve({
                    email: row['email'],
                    password: row['password'],
                    verified: row['verified']
                  });
                }
              );
            }
          }
        );
      });
    }
  };


module.exports = eventsForRequest