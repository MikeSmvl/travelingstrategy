const graphql = require('graphql');
const canadaAll = require('./canadaToAll')
const logger = require('../logger/logger.js')

logger.info("Querying with GraphQL")

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        canadaAll
    }
});

module.exports = queryType