const graphql = require("graphql");

const Event = new graphql.GraphQLObjectType({
  name: "Event",
  fields: {
    request_id: { type: graphql.GraphQLString },
    event_category: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString },
    duration: { type: graphql.GraphQLString },
    start_date: { type: graphql.GraphQLString },
    end_date: { type: graphql.GraphQLString },
    title: { type: graphql.GraphQLString },
    labels: { type: graphql.GraphQLString },
    address: { type: graphql.GraphQLString },
    place_type: { type: graphql.GraphQLString },
    name_of_place: { type: graphql.GraphQLString },
    image:{ type: graphql.GraphQLString }
    }
});

module.exports = Event