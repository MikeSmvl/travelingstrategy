const graphql = require('graphql');
const countryTable = require('./countryToAll')
const countryToCountry = require('./countryToCountry')
const {country_languages,languages_table} = require('./languages')
const currencies = require('./currencies')
const logger = require('../logger/logger.js')

logger.info(__filename +"Querying with GraphQL")

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        countryTable,
        countryToCountry,
        country_languages,
        languages_table,
        currencies
    }
});

module.exports = queryType