const graphql = require("graphql");

Subscriber = new graphql.GraphQLObjectType({
    name: 'subscriber',
    fields: {
        email: { type: graphql.GraphQLString },
        departure_date: { type: graphql.GraphQLString },
    }
});

module.exports = Subscriber;