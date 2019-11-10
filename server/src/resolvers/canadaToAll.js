const Canada = require('../classes/canada')
const graphql = require('graphql');
const database = require("../database/database");
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
            db.all(`SELECT * FROM canada WHERE name='${args.name}';`, function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = canadaAll