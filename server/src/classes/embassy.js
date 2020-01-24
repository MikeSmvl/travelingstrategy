const graphql = require("graphql");

const Embassy = new graphql.GraphQLObjectType({
  name: "Embassy",
  fields: {
      country: { type: graphql.GraphQLString },
      city: { type: graphql.GraphQLString },
      operator: { type: graphql.GraphQLString },
      type: { type: graphql.GraphQLString },
      phone: { type: graphql.GraphQLString },
      email: { type: graphql.GraphQLString },
      website: { type: graphql.GraphQLString }
    }
});

module.exports = Embassy