const phrase = require('../classes/phrase');
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js');
const db = new database().db;

var phrasesTranslation = {
    type: graphql.GraphQLList(phrase),
    args: {
        language_iso: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM phrases WHERE language_iso ='${args.language_iso}';`
            logger.info("Trying to query "+ query)
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

var phrasesTranslationCountry = {
    type: graphql.GraphQLList(phrase),
    args: {
        country_iso: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM phrases WHERE language_iso IN
                        (SELECT language_iso FROM language_iso WHERE
                            country_iso ='${args.country_iso}');`
            logger.info("Trying to query "+ query)
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

module.exports = {phrasesTranslation,phrasesTranslationCountry}