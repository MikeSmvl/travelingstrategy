const graphql = require('graphql');
const countryTable = require('./countryToAll')
const countryToCountry = require('./countryToCountry')
const {sockets_table, country_socket} = require('./sockets')
const {country_languages,languages_table} = require('./languages')
const {country_unsafe_areas, unsafe_areas_table} = require('./unsafeAreas')
const {time_difference_origin,time_difference_destination,timezones_table} = require('./timezones')
const currencies = require('./currencies')
const financials = require('./financials')
const {trafficSide,trafficTable} = require('./trafficSide')
const logger = require('../logger/logger.js')

logger.info(__filename +"Querying with GraphQL")

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        countryTable,
        countryToCountry,
        country_languages,
        country_unsafe_areas,
        unsafe_areas_table,
        languages_table,
        currencies,
        financials,
        sockets_table,
        country_socket,
        time_difference_origin,
        time_difference_destination,
        timezones_table,
        trafficSide,
        trafficTable
    }
});

module.exports = queryType