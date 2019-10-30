const graphql = require('graphql');
const canadaAll = require('./canadaToAll')

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        canadaAll
    }
});

module.exports = queryType