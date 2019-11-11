const graphql = require('graphql');
const canadaAll = require('./canadaToAll')
const countryTable = require('./countryToAll')
const logger = require('../logger/logger.js')

logger.info("Querying with GraphQL")

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        canadaAll,
        countryTable
    }
});

module.exports = queryType