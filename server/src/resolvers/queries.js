const graphql = require('graphql');
const books = require('./allBooks')

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        books
    }
});

module.exports = queryType