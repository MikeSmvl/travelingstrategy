const Book = require('../classes/book')
const graphql = require('graphql');
const database = require("../database/database");
const db = new database().db;

var books = {
    type: graphql.GraphQLList(Book),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM books;", function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = books