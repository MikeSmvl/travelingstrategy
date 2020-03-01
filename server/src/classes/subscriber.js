const graphql = require("graphql");

Subscriber = new graphql.GraphQLObjectType({
    name: 'subscriber',
    fields: {
        request_id: { type: graphql.GraphQLString },
        user_id: { type: graphql.GraphQLString },
        days_to_trip: { type: graphql.GraphQLString },
        date_of_trip: { type: graphql.GraphQLString },
        search_term: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
    }
});

module.exports = Subscriber;