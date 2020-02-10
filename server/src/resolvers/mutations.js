const { GraphQLObjectType} = require('graphql');
const { addUser } = require('./user')
const logger = require('../logger/logger.js')

logger.info(__filename +"Mutating with GraphQL")
const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser
    }
});

module.exports = mutationType;

