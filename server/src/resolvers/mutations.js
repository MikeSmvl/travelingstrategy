const { GraphQLObjectType} = require('graphql');
const {addCanadaToCountry,deleteCanadaToCountry} = require('./bookMutations')

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCanadaToCountry,
        deleteCanadaToCountry
    }
});

module.exports = mutationType;

