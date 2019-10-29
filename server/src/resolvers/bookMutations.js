const book = require('../classes/book')
const inputBookType = require('../classes/inputBook')
const graphql = require('graphql');
const database = require("../database/database");
const db = new database().db;

var addBooks = {
    type: book,
    args: {
        input: { 
            type: inputBookType 
        }
    },
    resolve: function (source, args) {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO books(author, title) VALUES(?,?);",[args.input.author, args.input.title], function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

var deleteBooks = {
    type: book,
    args: {
        input: { 
            type: inputBookType 
        }
    },
    resolve: function (source, args) {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM books where author=(?) and title=(?)",[args.input.author, args.input.title], function(err, rows) {
                if(err){
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

module.exports = {addBooks, deleteBooks}