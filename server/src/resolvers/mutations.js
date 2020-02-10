const { GraphQLObjectType} = require('graphql');
// const {addCountryToCountry, deleteCountryToCountry} = require('./countryMutations')
const addSubscriber = require('./add-subscriber')
const logger = require('../logger/logger.js')

logger.info(__filename +"Mutating with GraphQL")
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSubscriber
    }
});

module.exports = mutationType;

