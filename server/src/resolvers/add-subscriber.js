
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
        console.log('in resolve 1.1')
        return new Promise((resolve, reject) => {
            console.log('in promise 1.2')
            query = `INSERT INTO requests VALUES(null,'-1','-1','${args.date_of_trip}','${args.search_term}','${args.email}','${args.lat}','${args.lng}');`
            logger.info("Trying to query "+query)

            queryRequests = `SELECT * FROM requests;`;
            db.get(queryRequests, function(err, rows) {
                if(err){
                    logger.error(err)
                    reject(err);
                }
                logger.info(query+" successfully queried")
                //resolve(rows);
                var newHash = bcrypt.hashSync(email + search_term, 10);
                rows.forEach((row) => {
                    console.log(row.name);
                    var string = row.search_term + row.email;
                    var dbHash = bcrypt.hashSync(string, 10);
                    if(newHash.equals(oldHash)){
                        //return this if you find the same request
                        console.log();
                        return 1;
                    }
                });
            //not sure where to put this
            });

            //if(checkRequests(args.email, args.search_term)){
            //    return
            //}

            db.run(query, function(err, rows) {
                console.log('in db run 1.3');
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