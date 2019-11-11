const { GraphQLObjectType} = require('graphql');
const {addCanadaToCountry,deleteCanadaToCountry} = require('./canadaMutations')
const logger = require('../logger/logger.js')

logger.info("Mutating with GraphQL")
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCanadaToCountry,
        deleteCanadaToCountry
    }
});

module.exports = mutationType;

