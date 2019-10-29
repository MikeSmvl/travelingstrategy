const { GraphQLObjectType} = require('graphql');
const addBooks = require('./addBooks')

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBooks
    }
});

module.exports = mutationType;

