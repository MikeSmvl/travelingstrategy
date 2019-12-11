const graphql = require('graphql');
const countryTable = require('./countryToAll')
const countryToCountry = require('./countryToCountry')
const {sockets_table, country_socket} = require('./sockets')
const {country_languages,languages_table} = require('./languages')
const time_difference = require('./timezones')
const logger = require('../logger/logger.js')

logger.info(__filename +"Querying with GraphQL")

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        countryTable,
        countryToCountry,
        country_languages,
        languages_table,
        sockets_table,
        country_socket,
        time_difference
    }
});

module.exports = queryType