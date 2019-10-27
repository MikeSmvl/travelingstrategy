const Book = require('../classes/book')
const graphql = require('graphql');
const sqlite3 = require('sqlite3').verbose();
const database = require("../database/database");
// const database = new sqlite3.Database("./store.sqlite");
var db = new database().db;

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