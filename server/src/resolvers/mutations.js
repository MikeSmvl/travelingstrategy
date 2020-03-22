const { GraphQLObjectType} = require('graphql');
const { addUser } = require('./user')
// const {addCountryToCountry, deleteCountryToCountry} = require('./countryMutations')
const addSubscriber = require('./add-subscriber')
const {addEvents,removeEvent} = require('./eventsMutations')
const logger = require('../logger/logger.js')

logger.info(__filename +"Mutating with GraphQL")
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser,
        addSubscriber,
        addEvents,
        removeEvent
    }
});

module.exports = mutationType;

