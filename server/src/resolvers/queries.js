const graphql = require('graphql');
const canadaAll = require('./allBooks')

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        canadaAll
    }
});

module.exports = queryType