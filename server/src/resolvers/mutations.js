const { GraphQLObjectType} = require('graphql');
const {addCanadaToCountry,deleteCanadaToCountry} = require('./canadaMutations')

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCanadaToCountry,
        deleteCanadaToCountry
    }
});

module.exports = mutationType;

