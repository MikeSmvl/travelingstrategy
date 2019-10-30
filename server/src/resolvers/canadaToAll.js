const Canada = require('../classes/canada')
const graphql = require('graphql');
const database = require("../database/database");
const db = new database().db;

var canadaAll = {
    type: graphql.GraphQLList(Canada),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM canada;", function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = canadaAll