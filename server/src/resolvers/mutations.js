const { GraphQLObjectType} = require('graphql');
const {addCountryToCountry, deleteCountryToCountry} = require('./countryMutations')
const logger = require('../logger/logger.js')

logger.info(__filename +"Mutating with GraphQL")
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        deleteCountryToCountry,
        addCountryToCountry
    }
});

module.exports = mutationType;

