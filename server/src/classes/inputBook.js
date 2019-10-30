const graphql = require("graphql");

inputBook = new graphql.GraphQLInputObjectType({
    name: 'BookInput',
    fields: {
        author: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
    }
});

module.exports = inputBook;