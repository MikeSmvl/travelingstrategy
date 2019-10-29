const { GraphQLObjectType} = require('graphql');
const {addBooks,deleteBooks} = require('./bookMutations')

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBooks,
        deleteBooks
    }
});

module.exports = mutationType;

