const City_Timezone = require('../classes/city-timezones')
const graphql = require('graphql');
const database = require("../database/database");
const logger = require('../logger/logger.js')
const db = new database().db;


var time_difference_origin = {
    type: graphql.GraphQLList(City_Timezone),
    args: {
        lat_origin: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        lng_origin: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        country_origin:{
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM timezones WHERE (lat=${args.lat_origin} and lng=${args.lng_origin} and country_iso ="${args.country_origin}");`
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

var time_difference_destination = {
    type: graphql.GraphQLList(City_Timezone),
    args: {
        lat_destination: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        lng_destination: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)
        },
        country_destination:{
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    },
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM timezones WHERE (lat=${args.lat_destination} and lng=${args.lng_destination} and country_iso ="${args.country_destination}");`
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

var timezones_table = {
    type: graphql.GraphQLList(City_Timezone),
    resolve: (root, args, context, info) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM timezones;`
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

module.exports = {time_difference_origin,time_difference_destination,timezones_table}