const graphql = require('graphql');
const countryTable = require('./countryToAll')
const countryToCountry = require('./countryToCountry')
const {sockets_table, country_socket} = require('./sockets')
const {country_languages,languages_table} = require('./languages')
const currencies = require('./currencies')
const financials = require('./financials')
const logger = require('../logger/logger.js')

logger.info(__filename +"Querying with GraphQL")

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        countryTable,
        countryToCountry,
        country_languages,
        languages_table,
        currencies,
        financials,
        sockets_table,
        country_socket
    }
});

module.exports = queryType