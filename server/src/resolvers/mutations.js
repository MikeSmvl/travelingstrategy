const { GraphQLObjectType} = require('graphql');
const {addCanadaToCountry,deleteCanadaToCountry} = require('./canadaMutations')
const {addCountryToCountry} = require('./countryMutations')
const logger = require('../logger/logger.js')

logger.info("Mutating with GraphQL")
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCanadaToCountry,
        deleteCanadaToCountry,
        addCountryToCountry
    }
});

module.exports = mutationType;

